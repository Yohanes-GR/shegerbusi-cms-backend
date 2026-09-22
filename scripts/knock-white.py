from pathlib import Path
from PIL import Image

ROOT = Path(r"e:\Projects\sheger-business\public\brand")
PAIRS = [
    ("sbg-logo.jpg", "sbg-logo.png"),
    ("sheger-architect-logo.jpg", "sheger-architect-logo.png"),
]


def knock_white(src: Path, dst: Path, thresh: int = 242) -> None:
    im = Image.open(src).convert("RGBA")
    pixels = im.load()
    width, height = im.size
    for y in range(height):
        for x in range(width):
            r, g, b, _a = pixels[x, y]
            darkest = min(r, g, b)
            if r >= thresh and g >= thresh and b >= thresh:
                pixels[x, y] = (r, g, b, 0)
            elif darkest > 210:
                fade = int(255 * (thresh - darkest) / (thresh - 210))
                pixels[x, y] = (r, g, b, max(0, min(255, fade)))
    box = im.getbbox()
    if box:
        im = im.crop(box)
    im.save(dst, "PNG")
    print(f"{dst.name} {im.mode} {im.size}")


if __name__ == "__main__":
    for src_name, dst_name in PAIRS:
        knock_white(ROOT / src_name, ROOT / dst_name)
