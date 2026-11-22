from pathlib import Path
import subprocess

p = Path("game.js")
s = p.read_text(encoding="utf-8")
if "id==='doublepay'" in s:
    print("Double payment icon already present")
    raise SystemExit(0)

anchor = "  }else if(id==='greed'){"
if s.count(anchor) != 1:
    raise SystemExit("Expected exactly one greed icon branch; game.js not modified")
color = "greed:'#a6f062'"
if s.count(color) != 1:
    raise SystemExit("Expected exactly one greed color entry; game.js not modified")
s = s.replace(color, color+",doublepay:'#080e73'", 1)
art = """  }else if(id==='doublepay'){
    // Blue token on a rising chart, matching the shop item.
    g.save();g.rotate(.09);
    g.fillStyle='#060d70';g.fillRect(-64,-55,128,110);
    g.strokeStyle='#f1f2ff';g.lineWidth=6;g.lineCap='square';g.lineJoin='miter';
    g.beginPath();g.moveTo(-57,40);g.lineTo(-35,12);g.lineTo(-19,24);
    g.lineTo(2,-5);g.lineTo(18,8);g.lineTo(45,-30);g.stroke();
    g.save();g.translate(43,-31);g.rotate(-.18);
    g.shadowColor='#5ee9ff';g.shadowBlur=9;
    g.fillStyle='#0551a4';g.strokeStyle='#39eaff';g.lineWidth=4;
    g.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;
      i?g.lineTo(Math.cos(a)*23,Math.sin(a)*23):g.moveTo(Math.cos(a)*23,Math.sin(a)*23)}
    g.closePath();g.fill();g.stroke();g.shadowBlur=0;
    g.fillStyle='#4df3ff';g.beginPath();g.moveTo(0,-14);g.lineTo(14,0);
    g.lineTo(0,14);g.lineTo(-14,0);g.closePath();g.fill();
    g.fillStyle='#0750a0';g.beginPath();g.moveTo(0,-7);g.lineTo(7,0);
    g.lineTo(0,7);g.lineTo(-7,0);g.closePath();g.fill();
    g.restore();g.restore();
"""
s=s.replace(anchor,art+anchor,1)
Path("game.js").write_text(s,encoding="utf-8")
subprocess.run(["node","--check","game.js"],check=True)
print("Applied and syntax checked double payment icon")
