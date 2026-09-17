import numpy as np, subprocess, warnings, os
from PIL import Image
from scipy import ndimage as ndi
warnings.filterwarnings("ignore")
SP=os.path.dirname(os.path.abspath(__file__))
SRC=os.path.expanduser("~/Desktop/AAE-web-art/video/felt-earth-magenta.mp4")
W,H=1920,1080
def frames():
    p=subprocess.Popen(["ffmpeg","-v","error","-i",SRC,"-f","rawvideo","-pix_fmt","rgb24","-"],stdout=subprocess.PIPE)
    while True:
        buf=p.stdout.read(W*H*3)
        if len(buf)<W*H*3: break
        yield np.frombuffer(buf,np.uint8).reshape(H,W,3).astype(np.float32)
    p.stdout.close(); p.wait()
def matte(f):
    R,G,B=f[...,0],f[...,1],f[...,2]
    r=(np.minimum(R,B)-G)/np.maximum(np.maximum(R,B),1)     # magenta ratio key
    core=ndi.binary_opening(r>0.28,iterations=1)
    near=ndi.distance_transform_edt(~core)<=3
    ramp=np.clip((0.28-r)/(0.28-0.10),0,1)
    a=np.clip(np.where(core,0.0,np.where(near,ramp,1.0)),0,1)
    return keep_globe(a)
def keep_globe(a):
    """Drop stray specks: only the largest solid blob (plus its soft edge) survives."""
    solid=a>0.5
    lab,k=ndi.label(solid)
    if k<2: return a
    sizes=ndi.sum(solid.astype(np.float32),lab,range(1,k+1))
    keep=ndi.binary_dilation(lab==(int(np.argmax(sizes))+1),iterations=6)
    return np.where(keep,a,0.0)
# pass 1: the globe's box across the clip -- largest component only, so stray
# specks near the frame edge can't inflate the box (they did: 1214x938 vs 791x767)
def globe_box(f):
    ys,xs=np.where(matte(f)>0.5)
    if not len(xs): return None
    return [xs.min(),xs.max(),ys.min(),ys.max()]
box=None; n=0
for f in frames():
    n+=1
    b=globe_box(f)
    if b is None: continue
    box=b if box is None else [min(box[0],b[0]),max(box[1],b[1]),min(box[2],b[2]),max(box[3],b[3])]
cx=(box[0]+box[1])/2; cy=(box[2]+box[3])/2
side=int(max(box[1]-box[0],box[3]-box[2])*1.08); side+=side%2
if side>min(W,H):
    raise SystemExit(f"square {side} exceeds the frame ({W}x{H}) -- pad, never stretch")
x0=int(max(0,min(W-side,cx-side/2))); y0=int(max(0,min(H-side,cy-side/2)))
print(f"{n} frames | globe box {box} -> square {side} at ({x0},{y0})")
OUT=900
for i,f in enumerate(frames()):
    a=matte(f)[y0:y0+side, x0:x0+side]
    assert a.shape==(side,side), f"crop {a.shape} is not square"
    rgb=f[y0:y0+side, x0:x0+side].copy()
    R,G,B=rgb[...,0],rgb[...,1],rgb[...,2]
    ex=np.clip(np.minimum(R,B)-G,0,None)                    # despill the magenta fringe
    rgb=np.dstack([R-ex,G,B-ex])
    im=Image.fromarray(np.dstack([np.clip(rgb,0,255),a*255]).astype(np.uint8)).resize((OUT,OUT),Image.LANCZOS)
    im.save(f"{SP}/frames/f{i:04d}.png")
print("frames written")
