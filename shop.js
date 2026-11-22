'use strict';

function createShop(g,W,H,perks,randomize){
const items=[
 {perk:perks.find(perk=>perk.id==='tip'),cost:15,art:0},
 {perk:perks.find(perk=>perk.id==='plate'),cost:12,art:1},
 {perk:perks.find(perk=>perk.id==='cell'),cost:16,art:2},
 {perk:perks.find(perk=>perk.id==='servo'),cost:11,art:3},
 {perk:perks.find(perk=>perk.id==='lunge'),cost:15,art:4},
 {perk:perks.find(perk=>perk.id==='heat'),cost:13,art:5},
 {perk:perks.find(perk=>perk.id==='leech'),cost:13,art:6},
 {perk:perks.find(perk=>perk.id==='shaft'),cost:16,art:7},
 {perk:perks.find(perk=>perk.id==='greed'),cost:20,art:8},
 {perk:perks.find(perk=>perk.id==='pet'),cost:23,art:9},
 {perk:perks.find(perk=>perk.id==='core'),cost:13,art:10},
 {perk:perks.find(perk=>perk.id==='signal'),cost:16,art:11},
 {perk:perks.find(perk=>perk.id==='stunner'),cost:17,art:12},
 {perk:perks.find(perk=>perk.id==='ember'),cost:30,art:13},
 {perk:perks.find(perk=>perk.id==='confuse'),cost:20,art:14},
 {perk:perks.find(perk=>perk.id==='treasure'),cost:15,art:15},
 {perk:perks.find(perk=>perk.id==='dash'),cost:24,art:16},
 {perk:perks.find(perk=>perk.id==='doublepay'),cost:25,art:17},
 {perk:{id:'blackFriday',name:'Чёрная пятница',desc:'Скидка 20% на покупки до конца забега.'},cost:25,art:18},
 {perk:perks.find(perk=>perk.id==='observer'),cost:23,art:19},
 {perk:perks.find(perk=>perk.id==='devastating'),cost:18,art:20},
 {perk:{id:'potion',name:'Зелье лечения',desc:'Восстанавливает 10 здоровья.'},cost:10,art:21},
].map(({perk,cost,art})=>({perk,cost,art,name:perk.name.toUpperCase(),detail:perk.desc}));
const STOPWATCH=20,POTION=21,PERK_STANDS=3;
let tick=0,selected=-1,note='',noteTime=0,stock=[],player,run;
const price=item=>run.shopDiscount?Math.ceil(item.cost*.8):item.cost;
const standItemIndex=i=>stock[i];
const shopCtx=g;
function drawTennVisionShop(x,y,s,face,wheel,aim,zap,head){const g=shopCtx;g.save();g.translate(x,y);
  if(!head){g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(0,0,8*s,2*s,0,0,6.283);g.fill()}
  g.scale(face,1);const la=face===1?aim:Math.PI-aim;const R=(a,b,w,h,c)=>{g.fillStyle=c;g.fillRect(a*s,b*s,w*s,h*s)};
  const pl=pts=>{g.beginPath();pts.forEach((p,i)=>g[i?'lineTo':'moveTo'](p[0]*s,p[1]*s));g.stroke()};
  if(!head){g.fillStyle='#f2efe9';g.beginPath();g.arc(0,-4.5*s,4.3*s,0,6.283);g.fill();g.strokeStyle='#0c0b0d';g.lineWidth=.6*s;g.stroke();
    g.save();g.translate(0,-4.5*s);g.rotate(wheel);R(-1.2,-1.2,2.4,2.4,'#0c0b0d');R(-.4,-3.9,.8,1.7,'#0c0b0d');g.restore();
    g.strokeStyle='#1a1c28';g.lineWidth=1.3*s;g.beginPath();g.arc(0,-4.5*s,5.5*s,Math.PI*1.1,Math.PI*1.9);g.stroke();R(-.9,-14.2,1.8,4.6,'#1a1c28');
    const px=9+Math.cos(la)*15,py=-20+Math.sin(la)*15;g.strokeStyle='#1a1c28';g.lineWidth=.9*s;g.beginPath();g.moveTo(9*s,-19*s);
    g.bezierCurveTo(17*s,-6*s,(px-Math.cos(la)*10)*s,(py-Math.sin(la)*10+7)*s,(px-Math.cos(la)*3)*s,(py-Math.sin(la)*3)*s);g.stroke();
    g.save();g.translate(px*s,py*s);g.rotate(la);R(-3,-1.3,3.4,2.6,'#1a1c28');R(.4,-1.05,1.9,.55,'#f2efe9');R(.4,.5,1.9,.55,'#f2efe9');
    if(zap>0){g.fillStyle='rgba(200,220,255,.85)';g.beginPath();g.arc(2.8*s,0,2.4*s,0,6.283);g.fill()}g.restore()}
  g.lineWidth=1.2*s;g.strokeStyle='#5aa0ff';pl([[-4,-30],[-6.5,-33],[-3,-35],[-6,-37.5]]);R(-7.4,-39,2.6,2.6,'#1a3ad0');
  pl([[4,-30],[7.5,-34],[5,-36],[8,-38.5]]);R(7,-40,2.6,2.6,'#1a3ad0');for(let i=0;i<4;i++)R(-.4,-31-i,2,.6,i%2?'#8f8a95':'#f2efe9');
  g.fillStyle='#3a78ff';g.beginPath();g.moveTo(-9*s,-30*s);g.lineTo(-13.5*s,-28*s);g.lineTo(-13*s,-16*s);g.lineTo(-8*s,-14*s);g.closePath();g.fill();R(-12.6,-26.5,.8,9,'#8ab4ff');R(-11,-27.5,.8,11,'#8ab4ff');
  g.fillStyle='#0d0f1c';g.beginPath();g.moveTo(-9*s,-30*s);g.lineTo(10*s,-30*s);g.lineTo(9*s,-14*s);g.lineTo(-8*s,-14*s);g.closePath();g.fill();g.strokeStyle='#2a5bff';g.lineWidth=1.4*s;g.lineJoin='round';g.stroke();
  g.fillStyle='#f2efe9';g.beginPath();g.moveTo(-6*s,-23.5*s);g.quadraticCurveTo(.5*s,-13*s,7.5*s,-24.5*s);g.quadraticCurveTo(.8*s,-19.5*s,-6*s,-23.5*s);g.fill();
  g.strokeStyle='#0d0f1c';g.lineWidth=.35*s;for(const tx of[-3.2,-.6,2,4.6]){g.beginPath();g.moveTo(tx*s,-23*s);g.lineTo(tx*s,-16*s);g.stroke()}
  g.restore()}


// Original Observer rendering extracted from game.js, adapted only to shop canvas coordinates.
function drawObserverShop(o){
 const g=shopCtx;g.save();g.translate(o.x,o.y+Math.sin(o.t*3)*2);g.scale(o.face,1);
 for(let i=0;i<5;i++){const x=(i-2)*7,sw=Math.sin(o.t*4+i*.8)*3;g.beginPath();g.moveTo(x,11);g.bezierCurveTo(x+sw,21,x+sw-4,30,x+sw,36+(i%2)*4);g.lineCap='round';g.lineWidth=5;g.strokeStyle='#861c30';g.stroke();g.lineWidth=3;g.strokeStyle='#dd3048';g.stroke()}
 g.beginPath();g.arc(0,-3,21,0,6.283);g.fillStyle='#f7f0f3';g.fill();g.strokeStyle='#35151d';g.lineWidth=3;g.stroke();
 for(let i=0;i<9;i++){const a=i*6.283/9;g.beginPath();g.moveTo(Math.cos(a)*18,Math.sin(a)*18-3);g.lineTo(Math.cos(a)*12,Math.sin(a)*12-3);g.strokeStyle='#c93649';g.lineWidth=1.7;g.stroke()}
 if(!o.maw){const a=Math.atan2((o.y-46)-o.y,(o.x+50)-o.x),xx=Math.cos(a)*6*o.face,yy=Math.sin(a)*6;g.beginPath();g.arc(xx,yy-3,11,0,6.283);g.fillStyle='#c22539';g.fill();g.strokeStyle='#601525';g.lineWidth=2;g.stroke();g.fillStyle='#1b0710';g.fillRect(xx-4,yy-12,8,17);g.fillStyle='#fff';g.fillRect(xx-2,yy-10,3,4)}
 else{g.beginPath();g.ellipse(9,-3,15,16,0,0,6.283);g.fillStyle='#290710';g.fill();g.strokeStyle='#8b1b33';g.lineWidth=2.5;g.stroke();// Клыки растут по ВСЕМУ овальному контуру пасти, а не из двух горизонтальных рядов.
 // Каждый клык ориентирован к центру, с неровным основанием и искривлённым кончиком.
 const teeth=[
  [-2.91,4.3,2.6,.13],[-2.52,6.4,3.3,-.16],[-2.13,4.7,2.5,.18],
  [-1.75,6.1,3.1,-.09],[-1.37,3.8,2.4,.15],[-.99,5.6,2.9,-.12],
  [-.57,4.5,2.6,.13],[-.13,6.0,3.1,-.17],[.31,4.2,2.4,.10],
  [.75,5.8,3.2,-.15],[1.19,4.0,2.4,.12],[1.61,6.3,3.0,-.13],
  [2.01,4.6,2.6,.17],[2.42,5.7,3.0,-.10],[2.79,3.9,2.4,.12]
 ];
 g.fillStyle='#fff4e8';
 for(const [angle,len,width,bend] of teeth){
  const ca=Math.cos(angle),sa=Math.sin(angle);
  const bx=9+ca*13.5,by=-3+sa*14.4;
  // Нормаль к эллипсу задаёт направление зуба внутрь пасти.
  let nx=-ca/15,ny=-sa/16;const nl=Math.hypot(nx,ny);nx/=nl;ny/=nl;
  const tx=-ny,ty=nx,half=width*.5;
  const tipX=bx+nx*len+tx*bend*len,tipY=by+ny*len+ty*bend*len;
  g.beginPath();
  g.moveTo(bx-tx*half,by-ty*half);
  g.quadraticCurveTo(bx+nx*len*.36-tx*half*.55,by+ny*len*.36-ty*half*.55,tipX,tipY);
  g.quadraticCurveTo(bx+nx*len*.28+tx*half*.65,by+ny*len*.28+ty*half*.65,bx+tx*half,by+ty*half);
  g.closePath();g.fill();
 }
 }
 g.restore()
}

function drawShopObserver(){
 const t=tick;
 drawObserverShop({x:0,y:-7,t,face:1,maw:Math.sin(t*1.2)>0.1});
}

function drawArtifact(kind,x,y,scale=1){
 g.save();g.translate(x,y);g.scale(scale,scale);
 const fill=(points,color,outline=null,lw=1)=>{
  g.beginPath();points.forEach(([px,py],i)=>i?g.lineTo(px,py):g.moveTo(px,py));
  g.closePath();g.fillStyle=color;g.fill();
  if(outline){g.strokeStyle=outline;g.lineWidth=lw;g.stroke();}
 };
 const bar=(x,y,w,h,color)=>{g.fillStyle=color;g.fillRect(x,y,w,h)};
 const seg=(x1,y1,x2,y2,color,w=2)=>{g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.strokeStyle=color;g.lineWidth=w;g.stroke()};
 const label=(text,x,y,size,color)=>{g.font=`bold ${size}px monospace`;g.textAlign='center';g.fillStyle=color;g.fillText(text,x,y)};
 // The drawing space is roughly 60x64 and deliberately has no image backing.
 switch(kind){
 case 0: // Faceted lilac sharpened tip, angled as in the reference.
  g.rotate(.64);
  fill([[-9,24],[-9,12],[9,12],[9,24]],'#62458b');
  bar(-4,24,8,9,'#f0eff5');
  fill([[-13,12],[-14,-17],[0,-34],[14,-17],[13,12]],'#aa8adf','#6543a4',2);
  fill([[-8,10],[-9,-16],[0,-28],[0,10]],'#f0e9ff');
  fill([[0,-28],[9,-17],[8,10],[0,10]],'#d7c6fb');
  seg(0,-28,0,11,'#b298e6',1.4);
  break;
 case 1: // Two separated layered dark armor plates.
  g.rotate(.22);
  for(let j=0;j<2;j++){
   const xx=-19+j*21,yy=-25+j*4;
   fill([[xx,yy],[xx+19,yy],[xx+16,yy+48],[xx-3,yy+48]],'#272830','#17171c',2);
   for(let k=0;k<5;k++){
    const sy=yy+4+k*9;
    fill([[xx+1,sy],[xx+17,sy],[xx+16,sy+6],[xx,sy+6]],k%2?'#51525c':'#3c3d46');
    seg(xx,sy+7,xx+16,sy+7,'#17181e',1.6);
   }
  }
  break;
 case 2: // Green battery with dual exposed terminals and lightning.
  g.rotate(.24);
  bar(-13,-38,5,17,'#6d7078');bar(8,-38,5,17,'#6d7078');
  fill([[-18,-21],[18,-21],[18,31],[-18,31]],'#78bf12','#365b13',2.6);
  fill([[-13,-16],[13,-16],[13,26],[-13,26]],'#9cda25');
  fill([[8,-13],[-4,2],[4,3],[-9,22],[-3,7],[-10,5]],'#e6edec');
  break;
 case 3: // A recognisable side-profile boot, not a bent L.
  g.rotate(-.10);
  fill([[-12,-30],[4,-30],[5,-7],[12,-5],[23,-3],[24,12],[18,17],[-2,17],[-10,11],[-12,0]],'#d97911','#733808',1.8);
  fill([[-12,-30],[4,-30],[4,-23],[-12,-23]],'#ed1015');
  fill([[-8,-22],[1,-22],[1,-3],[10,0],[10,8],[-6,8]],'#e9952a');
  fill([[-12,-1],[-25,-7],[-21,-1],[-31,0],[-25,5],[-33,8],[-13,10]],'#f3f3f5','#b9b9c1',1);
  seg(-26,0,-12,3,'#c7c8cf',1.2);seg(-25,5,-12,7,'#c7c8cf',1.2);
  seg(-2,17,20,17,'#793d0c',2);
  break;
 case 4: // Reference-style elongated twin-barrel gun, open fork above long grip.
  g.rotate(.66);
  // long lower housing
  fill([[-17,17],[12,17],[12,65],[-17,65]],'#242329','#09090c',2);
  seg(-12,22,-12,58,'#ee0c1e',3.4);seg(7,22,7,58,'#ee0c1e',3.4);
  seg(-14,62,9,62,'#ee0c1e',3.5);
  // two slim separated barrels, bridged by the red U at the base
  fill([[-17,19],[-17,-44],[-9,-44],[-9,13],[-2,17]],'#26252c','#09090c',2);
  fill([[5,17],[12,11],[12,-44],[20,-44],[20,19]],'#26252c','#09090c',2);
  seg(-12,-35,-12,12,'#ed1023',3);seg(15,-35,15,12,'#ed1023',3);
  seg(-12,12,15,12,'#ed1023',3.5);
  // extended muzzle blocks
  fill([[-22,-68],[-6,-68],[-6,-42],[-22,-42]],'#302b39','#09090d',2);
  fill([[8,-68],[24,-68],[24,-42],[8,-42]],'#302b39','#09090d',2);
  for(let j=0;j<3;j++){
   bar(-19,-64+j*7,11,3,'#e20a20');bar(11,-64+j*7,11,3,'#e20a20');
  }
  break;
 case 5: // Long cylindrical striped firework, with offset nose and fuse.
  g.rotate(.44);
  fill([[-13,30],[-13,-23],[0,-39],[13,-23],[13,30]],'#df7d13','#844007',1.5);
  fill([[-13,-23],[0,-39],[13,-23],[10,-13],[-10,-13]],'#ef8c11');
  // Full-width diagonal white bands, clipped to the rocket's cylinder.
  g.save();g.beginPath();g.rect(-13,-13,26,43);g.clip();
  for(let k=-20;k<47;k+=13)fill([[-15,k],[-15,k+7],[15,k-4],[15,k-11]],'#e9edf2');
  g.restore();
  label('НП',0,-20,9,'#1a130f');
  seg(-11,30,-11,39,'#111014',2.5);seg(-11,39,-23,41,'#111014',2.5);
  break;
 case 7: // Rebuilt as a clearly readable, front-muzzled blue/green cannon.
  g.rotate(-.34);
  fill([[-21,9],[-8,9],[-6,31],[-20,31]],'#292d38','#141720',2);
  fill([[-29,-18],[18,-18],[22,-10],[22,11],[17,17],[-29,17]],'#68a6d3','#252a39',2);
  fill([[-25,-14],[13,-14],[13,13],[-25,13]],'#7ab7df');
  for(let j=0;j<4;j++)seg(-20+j*9,-11,-20+j*9,10,'#a3dd37',2.5);
  fill([[10,-20],[23,-20],[27,-13],[27,14],[22,20],[10,20]],'#a9e239','#426a20',2);
  fill([[18,-11],[29,-9],[29,9],[18,11]],'#111720','#13171e',2);
  fill([[-33,-20],[-25,-20],[-25,19],[-33,19]],'#32343c','#1c1c22',1.6);
  fill([[-32,18],[-14,18],[-14,27],[-32,27]],'#282831');
  seg(-23,-17,11,-17,'#dcf5ff',1.8);
  break;
 case 8: // Financial growth screen and a gold-green dollar coin.
  g.rotate(.08);bar(-31,-29,62,58,'#090d69');
  seg(-26,20,-10,3,'#edf1ff',3);seg(-10,3,-3,10,'#edf1ff',3);
  seg(-3,10,10,-9,'#edf1ff',3);seg(10,-9,16,-3,'#edf1ff',3);
  seg(16,-3,26,-17,'#edf1ff',3);
  g.beginPath();g.arc(19,-19,11,0,Math.PI*2);g.fillStyle='#a8e922';g.fill();
  label('$',19,-15,17,'#315900');break;
 case 9: // Actual published in-game sprite assets; no replacement illustration.
  drawTennVisionShop(0,40,1.85,1,0,0,0,false);break;
 case 10: // Luminous energy shield.
  g.shadowColor='#50dfff';g.shadowBlur=10;
  fill([[0,-37],[29,-25],[27,6],[17,23],[0,35],[-17,23],[-27,6],[-29,-25]],'rgba(35,112,178,.45)','#91e7ff',3);
  fill([[0,-29],[20,-19],[19,6],[11,17],[0,26],[-11,17],[-19,6],[-20,-19]],'rgba(91,140,237,.32)','#648ef7',1.6);
  seg(0,-29,0,26,'rgba(192,239,255,.6)',1);seg(-19,6,19,6,'rgba(192,239,255,.4)',1);
  break;
 case 11: // Tesla coil with animated electric arcs.
  bar(-20,24,40,9,'#414454');bar(-15,20,30,6,'#8b6571');
  bar(-5,-20,10,42,'#272b36');
  for(let j=0;j<10;j++)bar(-8,-18+j*4,16,2,j%2?'#dc6b1c':'#ff9a25');
  fill([[-18,-30],[-13,-36],[13,-36],[18,-30],[14,-23],[-14,-23]],'#aeb4c3','#383944',2);
  for(let j=0;j<5;j++)bar(-12+j*6,-31,3,3,'#3d4655');
  g.shadowColor='#e7e9ff';g.shadowBlur=8;
  for(let j=0;j<5;j++){
   const a=-2.9+j*1.35+Math.sin(tick*8+j)*.12;
   const xx=Math.cos(a)*29, yy=-29+Math.sin(a)*20;
   seg(Math.cos(a)*16,-29+Math.sin(a)*9,xx,yy,'#dce6ff',1.8);
   seg(xx,yy,xx+Math.cos(a+.5)*8,yy+Math.sin(a+.5)*8,'#dce6ff',1.5);
  }
  break;
 case 12: // Spring-loaded mechanical punch glove.
  g.rotate(-.2);
  bar(-17,25,34,9,'#454552');bar(-13,20,26,5,'#80818c');
  for(let j=0;j<5;j++){
   const y=20-j*7;
   seg(-13,y,13,y-5,'#9b9ba7',3.2);seg(13,y-5,-13,y-8,'#b9bbc7',3.2);
  }
  fill([[-22,-32],[-14,-40],[8,-40],[18,-32],[23,-17],[11,-10],[-19,-12]],'#e40717','#770714',2);
  fill([[-20,-32],[7,-36],[12,-24],[-19,-21]],'#f21929');
  fill([[10,-29],[24,-33],[29,-22],[18,-16]],'#d90717','#770714',1.5);
  break;
 case 13: // Long black-green grenade launcher.
  g.rotate(-.28);
  fill([[-35,-13],[32,-13],[32,6],[-35,6]],'#26352e','#0b1114',2.5);
  fill([[-29,-10],[25,-10],[25,-5],[-29,-5]],'#42574a');
  bar(-33,-15,7,24,'#14171c');bar(26,-15,8,24,'#111419');
  bar(-2,-13,6,19,'#8e7641');bar(18,-9,5,6,'#58685a');
  fill([[-2,6],[12,6],[12,11],[5,11],[3,25],[-6,25]],'#1c2324','#0b0e12',1.5);
  fill([[-23,6],[-15,6],[-15,15],[-25,15]],'#171b1e');
  bar(-19,-4,5,4,'#536b5c');bar(-10,-4,5,4,'#536b5c');
  break;


 case 14: // Confusion brain with an eye and six curling tentacles.
  // Tentacles are behind the brain, with subtle independent movement.
  for(let j=0;j<6;j++){
   const angle=Math.PI*.12+j*Math.PI*.34;
   const bx=Math.cos(angle)*18,by=Math.sin(angle)*12+3;
   const wave=Math.sin(tick*2+j*1.3)*3;
   const ex=bx+Math.cos(angle)*20+wave,ey=by+Math.sin(angle)*19;
   g.beginPath();g.moveTo(bx,by);
   g.bezierCurveTo(bx+Math.cos(angle)*11-5,by+Math.sin(angle)*9,
     ex+Math.sin(angle)*9,ey-Math.cos(angle)*8,ex,ey);
   g.strokeStyle='#64205d';g.lineWidth=8;g.lineCap='round';g.stroke();
   g.strokeStyle='#d75baf';g.lineWidth=5;g.stroke();
   g.strokeStyle='#ff9ad9';g.lineWidth=1.5;g.stroke();
  }
  g.shadowColor='#c97aff';g.shadowBlur=5;
  fill([[-29,-10],[-27,-23],[-17,-30],[-6,-28],[0,-23],[8,-30],[21,-28],[29,-18],[30,-5],[24,11],[13,19],[1,16],[-11,20],[-24,13]],'#d46dba','#71366c',2.5);
  g.shadowBlur=0;
  for(const path of [
   [[-22,-18],[-13,-24],[-9,-16],[-16,-11],[-24,-5]],
   [[-9,-27],[-3,-20],[-9,-12],[-5,-6]],
   [[6,-25],[13,-19],[8,-13],[15,-7]],
   [[19,-23],[25,-15],[19,-9],[25,-2]],
   [[-24,4],[-15,8],[-11,15]],[[13,11],[21,5]]
  ]){g.beginPath();path.forEach((pt,i)=>i?g.lineTo(...pt):g.moveTo(...pt));g.strokeStyle='#853f87';g.lineWidth=2.3;g.stroke()}
  g.beginPath();g.ellipse(0,-1,13,12,0,0,Math.PI*2);g.fillStyle='#f8e9ef';g.fill();g.strokeStyle='#5c245f';g.lineWidth=3;g.stroke();
  g.beginPath();g.arc(1,-1,7,0,Math.PI*2);g.fillStyle='#9b4fc2';g.fill();
  g.beginPath();g.arc(2,-1,3.5,0,Math.PI*2);g.fillStyle='#160c24';g.fill();
  g.beginPath();g.arc(4,-4,1.8,0,Math.PI*2);g.fillStyle='#fff';g.fill();
  break;
 case 15: // Shovel: unmistakable straight wooden handle and steel spade.
  g.rotate(-.57);
  bar(-4,-37,8,52,'#185d2d');
  bar(-2,-34,3,45,'#319b4b');
  fill([[-11,-38],[11,-38],[11,-33],[-11,-33]],'#064d24','#032d18',1.5);
  fill([[-10,13],[10,13],[17,23],[13,31],[0,40],[-13,31],[-17,23]],'#858592','#2d303c',2.5);
  fill([[-8,16],[0,16],[0,34],[-11,27]],'#c6c6ce');
  seg(0,16,0,35,'#5b5e6b',1.5);
  break;
 case 16: // Jarona: readable green dash capsule with two bold arrows.
  g.rotate(.18);
  g.shadowColor='#52fa36';g.shadowBlur=8;
  fill([[-23,-17],[-38,-10],[-26,-7],[-41,1],[-26,3],[-37,13],[-18,10]],'#65f72b');
  g.shadowBlur=0;
  fill([[-19,-29],[17,-29],[23,-21],[23,23],[17,30],[-19,30],[-24,23],[-24,-21]],'#262833','#090b13',2.5);
  fill([[-17,-21],[17,-21],[17,22],[-17,22]],'#38e722','#137d24',2);
  // Two separate clean white chevrons, not overlapping.
  for(const cy of [-9,9]){
    fill([[-9,cy-6],[1,cy],[ -9,cy+6],[-5,cy+9],[10,cy],[ -5,cy-9]],'#f7fff0','#17351b',1.4);
  }
  fill([[-19,-30],[17,-30],[21,-25],[-22,-25]],'#5a5c69','#171821',1);
  fill([[-19,25],[18,25],[21,30],[-22,30]],'#5a5c69','#171821',1);
  bar(-7,-33,14,4,'#8aff4b');
  break;
 case 17: // Finance graph with violet token.
  g.rotate(.09);bar(-31,-29,62,58,'#070e6a');
  seg(-27,22,-12,5,'#edf1ff',3);seg(-12,5,-4,13,'#edf1ff',3);
  seg(-4,13,9,-8,'#edf1ff',3);seg(9,-8,16,-1,'#edf1ff',3);seg(16,-1,25,-18,'#edf1ff',3);
  g.beginPath();g.arc(20,-19,12,0,Math.PI*2);g.fillStyle='#a891f3';g.fill();
  fill([[20,-28],[29,-19],[20,-10],[11,-19]],'#e5dfff','#7557c3',2);
  break;
 case 18: // Discount sign.
  g.rotate(.11);bar(-35,-22,70,44,'#08090e');
  label('-20%',0,11,24,'#f1f0f4');break;
 case 19: // The Observer is drawn by the original game function.
  drawShopObserver();break;

 case STOPWATCH:
  bar(-6,-32,12,10,'#dce7f6');
  bar(-9,-35,18,5,'#899bb4');
  seg(15,-17,22,-24,'#b5c1d4',5);
  g.beginPath();g.arc(0,0,23,0,Math.PI*2);g.fillStyle='#20243b';g.fill();
  g.lineWidth=4;g.strokeStyle='#c6d1e6';g.stroke();
  g.beginPath();g.arc(0,0,16,0,Math.PI*2);g.fillStyle='#f2e8ed';g.fill();
  seg(0,0,0,-12,'#b3234e',3);seg(0,0,8,5,'#b3234e',3);
  bar(-2,-2,4,4,'#56203f');
  break;
 case POTION:
  fill([[-8,-22],[8,-22],[8,-8],[17,0],[19,13],[14,23],[-14,23],[-19,13],[-17,0],[-8,-8]],'#351a32','#f3b3c7',3);
  fill([[-15,4],[15,4],[16,13],[12,20],[-12,20],[-16,13]],'#e23965');
  bar(-9,-26,18,6,'#d6a275');
  bar(-2,6,4,11,'#fff2f6');bar(-5,9,10,4,'#fff2f6');
  break;
 case 6: // One solid pixel silhouette: no visible bands or overlaid stripes.
  fill([[-26,-22],[-8,-22],[-8,-14],[8,-14],[8,-22],[26,-22],
        [26,11],[19,11],[19,20],[12,20],[12,28],[6,28],
        [6,34],[-6,34],[-6,28],[-12,28],[-12,20],[-19,20],
        [-19,11],[-26,11]],'#e00012');
  break;
 }
 g.restore();
}
const merchantSprite=new Image();merchantSprite.src='data:image/webp;base64,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';
const rect=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h)},stroke=(x,y,w,h,col,l=1)=>{g.strokeStyle=col;g.lineWidth=l;g.strokeRect(x,y,w,h)},line=(x,y,xx,yy,col,width=1)=>{g.strokeStyle=col;g.lineWidth=width;g.beginPath();g.moveTo(x,y);g.lineTo(xx,yy);g.stroke()},poly=(pts,col)=>{g.fillStyle=col;g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill()},txt=(str,x,y,size=14,color=C.ink,align='center',font='Consolas, monospace')=>{g.textAlign=align;g.font=`bold ${size}px ${font}`;g.fillStyle=color;g.fillText(str,x,y)};const glow=(x,y,r,color)=>{let gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,color);gr.addColorStop(1,'transparent');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)};
// The merchant is a real sprite, not a blocky hand-redrawn approximation.
// It is embedded in this HTML; the image contains the approved TV face, coat,
// properly shaped tie, and the arms extended onto the countertop.
// Native sprite is 550 x 600: preserve its original 11:12 proportions.
const SELLER={x:430,y:176,w:100,h:109};
const SHOP_RAISE=38; // move the merchant, counter and all four pedestals together
function merchant(){
 if(!merchantSprite.complete||!merchantSprite.naturalWidth)return;
 const m=SELLER,dy=Math.sin(tick*1.9)*.65;
 g.drawImage(merchantSprite,m.x,m.y+dy,m.w,m.h);
}
function merchantHandsInFront(){
 if(!merchantSprite.complete||!merchantSprite.naturalWidth)return;
 const m=SELLER,dy=Math.sin(tick*1.9)*.65;
 // Soft contact shadows and a gentle side-profile on the counter rim.
 g.save();
 g.fillStyle='rgba(0,0,0,.23)';
 g.beginPath();g.ellipse(m.x+13,286,12,3,0,0,Math.PI*2);g.ellipse(m.x+m.w-13,286,12,3,0,0,Math.PI*2);g.fill();
 g.beginPath();g.rect(m.x-2,276,28,13);g.rect(m.x+m.w-26,276,28,13);g.clip();
 g.drawImage(merchantSprite,m.x,m.y+dy,m.w,m.h);
 g.restore();
}
function drawRoom(bounds){
 // Simple, spacious shop room, using the understated arena style of the game.
 const grad=g.createLinearGradient(0,65,0,560);grad.addColorStop(0,'#0b0d1b');grad.addColorStop(1,'#10152b');rect(0,0,W,H,'#070910');rect(bounds.x,bounds.y,bounds.w,bounds.h,grad);
 for(let x=59;x<918;x+=62)line(x,76,x,539,'rgba(66,77,136,.17)');
 for(let y=91;y<539;y+=62)line(44,y,916,y,'rgba(66,77,136,.17)');
 // Single subtle emblem and two wall strips; no shelves, cables, crates or banners.
 g.save();g.globalAlpha=.24;stroke(455,118,50,42,'#7462b0',2);txt('◆',480,149,25,'#735bb3');g.restore();

}

// Decoration: only substantial furniture blocks movement.
const SHOP_FURNITURE=[
 {x:91,y:168,w:96,h:104},
 {x:773,y:168,w:96,h:104},
 {x:104,y:445,w:76,h:49},
 {x:780,y:445,w:76,h:49}
];
function drawDecorations(){
 const glow=(x,y,r,color)=>{
  const a=g.createRadialGradient(x,y,2,x,y,r);
  a.addColorStop(0,color);a.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=a;g.fillRect(x-r,y-r,r*2,r*2);
 };
 // Inlaid floor runner, painted floor symbols: no collision.
 g.save();
 g.fillStyle='rgba(86,56,122,.19)';g.fillRect(425,357,110,165);
 g.strokeStyle='rgba(171,124,235,.38)';g.lineWidth=2;g.strokeRect(430,365,100,148);
 for(let y=383;y<509;y+=25){line(440,y,520,y,'rgba(166,128,213,.14)',1)}
 g.translate(480,445);g.rotate(Math.PI/4);stroke(-19,-19,38,38,'rgba(196,151,245,.3)',2);g.restore();
 // Wall lanterns, light pools and wiring.
 for(const x of [235,725]){
  glow(x,130,91,'rgba(156,95,247,.18)');
  line(x,77,x,111,'#6b567d',3);
  rect(x-17,110,34,30,'#20182e');stroke(x-17,110,34,30,'#a16cc5',2);
  rect(x-9,116,18,18,'#c48aff');rect(x-5,118,10,13,'#e6c9ff');
  rect(x-21,137,42,5,'#54436c');
 }
 // Rear-wall banner and two display shelves.
 rect(415,88,130,57,'#21172f');stroke(415,88,130,57,'#8160ae',2);
 txt('✦',480,115,27,'#b991ff');txt('ЛАВКА',480,134,12,'#d5b9ef');
 for(const [x,y] of [[310,173],[650,173]]){
  rect(x-49,y,98,8,'#55416b');rect(x-45,y+8,6,10,'#35253e');rect(x+39,y+8,6,10,'#35253e');
  for(let j=0;j<4;j++){
   const px=x-34+j*22;
   rect(px,y-20-(j%2)*7,14,20+(j%2)*7,['#573f75','#405b78','#805368','#66517b'][j]);
   rect(px+3,y-16-(j%2)*7,4,8,'rgba(238,204,255,.38)');
  }
 }
 // Cabinets and wooden supply boxes. Collision geometry is shared below.
 for(let i=0;i<2;i++){
  const f=SHOP_FURNITURE[i];
  rect(f.x+4,f.y+7,f.w,f.h,'rgba(0,0,0,.35)');
  rect(f.x,f.y,f.w,f.h,'#292038');stroke(f.x,f.y,f.w,f.h,'#8e6aa7',3);
  rect(f.x+8,f.y+10,f.w-16,23,'#463151');
  rect(f.x+8,f.y+40,(f.w-19)/2,54,'#201b30');
  rect(f.x+11+(f.w-19)/2,f.y+40,(f.w-19)/2,54,'#201b30');
  stroke(f.x+8,f.y+40,f.w-16,54,'#725480',2);
  rect(f.x+f.w/2-11,f.y+64,5,11,'#c4a070');
  rect(f.x+f.w/2+7,f.y+64,5,11,'#c4a070');
  txt('✦',f.x+f.w/2,f.y+27,17,'#d1a7e6');
  rect(f.x-4,f.y-8,f.w+8,9,'#544064');
 }
 for(let i=2;i<4;i++){
  const f=SHOP_FURNITURE[i];
  rect(f.x+5,f.y+7,f.w,f.h,'rgba(0,0,0,.28)');
  rect(f.x,f.y,f.w,f.h,'#654633');stroke(f.x,f.y,f.w,f.h,'#a77b4e',2);
  rect(f.x+8,f.y+7,f.w-16,f.h-14,'#76523a');
  line(f.x+9,f.y+8,f.x+f.w-9,f.y+f.h-8,'#a27a51',4);
  line(f.x+f.w-9,f.y+8,f.x+9,f.y+f.h-8,'#a27a51',4);
  rect(f.x+f.w/2-7,f.y,14,f.h,'#a98653');
 }
 // Little wall-mounted pipes are visual only.
 for(const x of [62,898]){
  line(x,110,x,260,'#3e425e',5);
  for(const y of [145,230])rect(x-7,y,14,7,'#70637d');
 }
}

// Shared visual/hitbox geometry: graphics and collisions cannot drift apart.
const STAND_CENTERS=[330,430,530,630];
const STAND_WIDTH=64;
const STAND_TOP=346+12-SHOP_RAISE;
const STAND_BOTTOM=432+12-SHOP_RAISE;
function drawStands(){
 for(let i=0;i<STAND_CENTERS.length;i++){
   const x=STAND_CENTERS[i],idx=standItemIndex(i),it=idx===undefined?null:items[idx],on=selected===i;
   // Narrower 64px-wide matching top and bottom, same height as before.
   rect(x-32,346,64,48,'#1c1b32');
   stroke(x-32,346,64,48,on?'#b9a0e8':'#51436e',on?2:1);
   rect(x-27,353,54,29,'#101426');
   // Empty display: keep the pedestal and its selection hitbox.
   rect(x-32,394,64,38,'#232241');
   stroke(x-32,394,64,38,'#51436e',1);
   rect(x-27,400,54,26,'#2d2c52');
   rect(x-17,400,5,26,'rgba(168,137,241,.10)');
   rect(x+12,400,5,26,'rgba(168,137,241,.08)');
   if(it){g.save();g.shadowColor='#a66bff';g.shadowBlur=8;drawArtifact(idx,x,354+Math.sin(tick*2+i)*1.5,idx===4?.49:(idx===9?.70:idx===13?.73:idx===11?.78:idx===19?.65:.76));g.restore();txt(String(price(it))+' ◆',x,391,10,'#dfc3ff');}
 }
}
function drawCounter(){
 // Compact counter with plenty of clear floor around it.
 rect(350,292,260,62,'#141222');rect(350,285,260,12,'#39304f');rect(354,284,252,4,'#8d74bd');
 rect(357,304,246,41,'#242037');stroke(357,304,246,41,'#584774',1);
 rect(438,312,84,27,'#191429');stroke(438,312,84,27,'#6e5795',1);
 txt('МАГАЗИН',480,330,12,'#bdabe1');
}
function wrapShopText(message,maxWidth,fontSize=12){
 g.font=`bold ${fontSize}px Consolas, monospace`;
 const words=message.split(/\s+/),lines=[];let line='';
 for(const word of words){
  const trial=line?line+' '+word:word;
  if(line&&g.measureText(trial).width>maxWidth){lines.push(line);line=word;}
  else line=trial;
 }
 if(line)lines.push(line);
 return lines;
}
function drawUi(){
 if(selected>=0){
   const idx=standItemIndex(selected),it=idx===undefined?null:items[idx],x=STAND_CENTERS[selected];
   const labelW=410,labelX=Math.min(W-labelW-20,Math.max(20,x-labelW/2));
   const detailLines=wrapShopText(it?it.detail:'',labelW-34,12);
   const boxH=Math.max(118,94+Math.max(1,detailLines.length)*16);
   const labelY= Math.min(453, H-boxH-16);
   rect(labelX,labelY,labelW,boxH,'rgba(9,7,22,.97)');
   stroke(labelX,labelY,labelW,boxH,'#9467d4',2);
   txt(it?it.name:'НЕТ В НАЛИЧИИ',labelX+labelW/2,labelY+27,it&&it.name.length>25?12:16,'#f3e7ff');
   detailLines.forEach((part,i)=>txt(part,labelX+labelW/2,labelY+50+i*16,12,'#ddd0ec'));
   txt(it?'ЦЕНА: '+price(it)+' ТОКЕНОВ':'ВСЁ РАСКУПЛЕНО',labelX+labelW/2,labelY+boxH-39,12,'#b7a9c9');
   txt(it?'[E] КУПИТЬ':'',labelX+labelW/2,labelY+boxH-17,12,'#b8a0d5');
 }
 if(noteTime>0){
   rect(226,83,508,34,'rgba(8,6,16,.95)');stroke(226,83,508,34,'#855ad0');txt(note,480,106,14,'#f8eaff');
 }
}
function nearestStand(){
 // Interact from the outside of a pedestal, including its left/right sides.
 let closest=-1,dist=Infinity;
 for(let i=0;i<STAND_CENTERS.length;i++){
   const x=STAND_CENTERS[i],left=x-STAND_WIDTH/2,right=x+STAND_WIDTH/2;
   const nx=Math.max(left,Math.min(right,player.x));
   const ny=Math.max(STAND_TOP,Math.min(STAND_BOTTOM,player.y));
   const d=Math.hypot(player.x-nx,player.y-ny);
   if(d<=32&&d<dist){dist=d;closest=i;}
 }
 return closest;
}

function enter(activeRun,activePlayer){
 run=activeRun;
 player=activePlayer;
 selected=-1;
 tick=0;
 noteTime=0;
 const available=items.slice(0,POTION).filter(item=>!run.picked.includes(item.perk.name));
 stock=Array(PERK_STANDS+1);
 randomize(available).slice(0,PERK_STANDS).forEach((item,i)=>stock[i]=item.art);
 stock[PERK_STANDS]=POTION;
 return [
  ...SHOP_FURNITURE,
  {x:SELLER.x+8,y:SELLER.y-SHOP_RAISE+5,w:SELLER.w-16,h:SELLER.h-10},
  {x:350,y:285-SHOP_RAISE,w:260,h:70},
  ...STAND_CENTERS.map(x=>({x:x-STAND_WIDTH/2,y:STAND_TOP,w:STAND_WIDTH,h:STAND_BOTTOM-STAND_TOP}))
 ];
}
function update(dt,buy,apply){
 tick+=dt;
 noteTime=Math.max(0,noteTime-dt);
 selected=nearestStand();
 if(!buy||selected<0)return;
 const item=items[stock[selected]];
 if(!item){note='НЕТ В НАЛИЧИИ';}
 else if(run.coins<price(item)){note='НЕ ХВАТАЕТ ТОКЕНОВ';}
 else if(item.art===POTION&&player.hp>=player.maxHp){note='ЗДОРОВЬЕ УЖЕ ПОЛНОЕ';}
 else{
  run.coins-=price(item);
  delete stock[selected];
  if(item.art===POTION)player.hp=Math.min(player.maxHp,player.hp+10);
  else if(item.perk.id==='blackFriday'){
   run.shopDiscount=true;
   run.picked.push(item.perk.name);
  }else apply(item.perk);
  note='КУПЛЕНО: '+item.name;
 }
 noteTime=2.6;
}
function draw(bounds,drawDoors){
 drawRoom(bounds);
 drawDoors();
 drawDecorations();
 g.save();g.translate(0,-SHOP_RAISE);
 merchant();drawCounter();
 g.save();g.translate(0,12);drawStands();g.restore();
 merchantHandsInFront();g.restore();
}
return {enter,update,draw,drawUi};
}
