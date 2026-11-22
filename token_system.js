/* Sinister Shenanigans alpha — tokens and end-of-run rewards.
   Loaded after game.js; keeps the existing combat and room systems intact. */
(function(){
  const baseMods=defMods;
  defMods=function(){return {...baseMods(),tokenMul:1}};
  PERKS.push({
    id:'doublepay',name:'Двойная оплата',
    desc:'За время забега выпадает в 1,5 раза больше токенов',
    apply:m=>{m.tokenMul=(m.tokenMul||1)*1.5}
  });
  const oldKill=killEnemy;
  killEnemy=function(e){
    if(!e||!e.alive)return;
    const previous=run?run.kills:0;
    oldKill(e);
    if(run&&run.kills>previous){
      const multiplier=run.mods.tokenMul||1;
      const a=Math.random()*Math.PI*2;
      pickups.push({x:e.x,y:e.y,vx:Math.cos(a)*85,vy:Math.sin(a)*85,val:multiplier,t:0,token:true});
      text(e.x,e.y-24,'+1 ТОКЕН',C.tech,13);
    }
  };
  // Old coins from enemies, props and bosses are replaced by token drops.
  addCoins=function(){};
  const oldCoinIcon=coinIcon;
  coinIcon=function(x,y,r){
    if(!run||!['run','choice','dead','win','bosschoice'].includes(state)){
      oldCoinIcon(x,y,r);return;
    }
    ctx.save();ctx.translate(x,y);
    ctx.fillStyle='#063a82';ctx.strokeStyle='#26e8ff';ctx.lineWidth=Math.max(2,r*.22);
    ctx.beginPath();
    for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;const xx=Math.cos(a)*r,yy=Math.sin(a)*r;
      if(!i)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy)}
    ctx.closePath();ctx.fill();ctx.stroke();
    ctx.fillStyle='#21e9ff';ctx.beginPath();ctx.moveTo(0,-r*.65);ctx.lineTo(r*.62,0);ctx.lineTo(0,r*.65);ctx.lineTo(-r*.62,0);ctx.closePath();ctx.fill();
    ctx.restore();
  };
  // In the game engine run.coins now holds collected tokens; persistent save.coins
  // remains the regular currency, granted only at the end of a run.
  finalize=function(won){
    if(!run||run.rewarded)return;
    run.rewarded=true;
    const tokens=Math.floor(run.coins||0);
    const kills=run.kills||0;
    const rooms=(run.stages||0)+(won?1:0);
    const base=kills*2+rooms*5+tokens*3+(won?30:0);
    const multiplier=(run.mods.coinMul||1)*(run.hard?2:1);
    const earned=Math.floor(base*multiplier);
    save.coins+=earned;
    save.runs++;
    if(won)save.wins++;
    persist();
    ui.result={won,coins:earned,tokens,kills,rooms,level:run.level,
      picked:run.picked.slice(),hard:run.hard,rush:!!run.rush,zone:run.zone};
  };
  drawResult=function(){
    const r=ui.result;if(!r)return;
    ctx.fillStyle='rgba(12,11,18,.95)';ctx.fillRect(0,0,W,H);
    label(r.won?'ПОБЕДА':'ПОРАЖЕНИЕ',W/2,135,43,r.won?C.ember:C.red);
    label('НАГРАДА ЗА ЗАБЕГ',W/2,185,19,C.ink);
    label('Убито врагов: '+r.kills,W/2,234,17,C.ink);
    label('Пройдено комнат: '+r.rooms,W/2,267,17,C.ink);
    label('Собрано токенов: '+r.tokens,W/2,300,17,C.tech);
    label('ЗАРАБОТАНО МОНЕТ: +'+r.coins,W/2,360,25,C.coin);
    if(r.hard)label('ХАРДМОД: МОНЕТЫ ×2',W/2,394,13,C.red);
    label('Нажми ЛКМ или E, чтобы вернуться на базу',W/2,508,14,C.muted,'center',FM);
  };
  const oldHUD=drawHUD;
  drawHUD=function(){
    oldHUD();
    if(run&&state==='run')label('ТОКЕНЫ',W-115,17,11,C.tech,'center',FM);
  };
  const oldPause=drawPause;
  drawPause=function(){
    oldPause();
    label('Токены тратятся в магазине; монеты начисляются в конце забега',W/2,525,12,C.tech,'center',FM);
  };
})();