let CDate = new Date();
let today = new Date();

buildCalendar();

function buildCalendar() {
    let prevLast = new Date(CDate.getFullYear(), CDate.getMonth(), 0);
    let thisFirst = new Date(CDate.getFullYear(), CDate.getMonth(), 1);
    let thisLast = new Date(CDate.getFullYear(), CDate.getMonth() + 1, 0);
    document.querySelector(".yearTitle").innerHTML = CDate.getFullYear() + '년';
    //상단에 년도 출력
    document.querySelector(".monthTitle").innerHTML = CDate.getMonth() + 1 + '월';
    //상단에 월 출력 
    let dates = [];
    let prevDates = [];
    let nextDates = [];
    //현재 월 달력에 쓰일 날짜를 모을 배열 
    if (thisFirst.getDay() != 0) {//만약 이번 월의 첫째날이 일요일이 아니라면 
        for (let i = 0; i < thisFirst.getDay(); i++) {//일요일부터 이번 월의 요일까지 날짜를 구하기 위한 for문 
            prevDates.unshift(prevLast.getDate() - i);//이전 월의 마지막 날짜부터 1씩 빼가며 unshift(배열 앞에 값을 넣습니다.) 
        }
    }
    for (let i = 1; i <= thisLast.getDate(); i++) {//이번 월 날짜 구하기 
        dates.push(i);
    }
    for (let i = 1; i <= 13 - thisLast.getDay(); i++) {//다음 월 날짜 구하기 13에서 빼는 이유는, 2월달력의 경우 최대 3월 13일까지 표시될 수 있음
        nextDates.push(i);
    }
    
    //선택한 날짜 달력에 체크하기 - 날짜 쪼개서 배열로 보관
    var periods = document.getElementById('vac-period').value.split(' / ');
    var check = [];
    for(var i=0; i<periods.length-1; i++){
       var period = periods[i].split('-');
          var y = period[0]
          var m = period[1];
          var d = period[2];
          if(m == CDate.getMonth()+1){
             check.push(d);
          }
    }
    
    let htmlDates = '';//날짜 정보를 html형식으로 저장할 변수 
    for (let i = 0; i < prevDates.length; i++) {//42일을 출력할 for문 
        htmlDates += `<div class="date choice-date except">${prevDates[i]}</div>`
    }
    
    for (let i = 0; i < dates.length; i++) {//42일을 출력할 for문 
       /*이번달 오늘 이전이거나 과거일때(이번 해 이전달들 혹은 지난해들) -> 이 부분을 중심적으로 수정 중*/
       if((today.getDay + 13) < today.getDate()  ){
          htmlDates += `<div class="date choice-date except">${dates[i]}</div>`
       }
       else{//오늘이라면
           if (today.getDate() == dates[i] && today.getMonth() == CDate.getMonth() && today.getFullYear() == CDate.getFullYear()) { //만약 년도, 월, 일이 똑같은 dates[i]값이 나오면 class에 today를 추가하기 위함. 
                    //이를 이용해서 today표시
                    htmlDates += `<div class="date choice-date"><span class="today">${dates[i]}</span></div>`;
           //오늘 이후라면
           } else {
              let y = false;
              for(let j=0; j<check.length; j++){
                 //선택된 날짜일때
                 if(dates[i]==check[j]){
                    htmlDates += `<div class="date choice-date" onclick="readDate(this)" style="background:var(--imp-color); color:white;">${dates[i]}</div>`
                       y = true;
                 }
              }
              if(y==false)
                 htmlDates += `<div class="date choice-date" onclick="readDate(this)">${dates[i]}</div>`
              }
          }
        }
           
    
    for (let i = 0; i < nextDates.length; i++) {//42일을 출력할 for문 
        htmlDates += `<div class="date choice-date except">${nextDates[i]}</div>`
    }

    document.querySelector(".dates").innerHTML = htmlDates;//htmlDates를 index.html의 .dates안에 넣는 작업 
} //<i class="fas fa-exclamation-circle"></i>

function prevCal() { CDate.setMonth(CDate.getMonth() - 1); buildCalendar(); }
function nextCal() { CDate.setMonth(CDate.getMonth() + 1); buildCalendar(); }

var cnt = 0;
var pr = [];
function readDate(target){
   let vDate = new Date();
   let d = target.innerText;
   if(d.length==1) d = '0'+d;
   let m = (CDate.getMonth()+1).toString();
   if(m.length==1) m = '0'+m;
   let y = CDate.getFullYear().toString();
   y = y.substr(2,2);
   let cdate = y +'-'+ m +'-'+ d;
   console.log("cdate:"+cdate);
   console.log("cnt : " +cnt);
   let input = document.getElementById('vac-period');
   
   if(input.value.includes(cdate)){
       target.style.background = 'transparent';
       target.style.color = 'var(--base-color)';
       
       pr.splice(pr.indexOf(cdate),1);
       if(pr.length==0){
           input.value = '';
           cnt--;
        }else{
          for(let i=0; i<pr.length; i++){
             if(i==0) {input.value = pr[i];}
             else input.value += (' / ' + pr[i]);
          }
           cnt--;
           let sCnt1 = " (" + cnt + ")";
           input.value+= sCnt1;
        }
       
   //클릭하여 선택
   } else {
      target.style.background='var(--imp-color)';
      target.style.color = 'white';
      cnt++;
      let sCnt2 = " (" + cnt + ")";
      pr.push(cdate);
      pr.sort();
      
      for(let i=0; i<pr.length; i++){
         if(i==0) input.value = pr[i];
         else{
            input.value += (' / ' + pr[i]);
         }
      }
       input.value += sCnt2;
   }
   
function checkForm() {
	if(document.getElementById('vac-period').value == null || document.getElementById('vac-reason').value == null) {
		alert("정정일자 및 사유를 입력해주세요.");
	} else {
		alert("정정신청이 완료되었습니다.");
	}
}
   
   /*//잔여연차를 초과하여 추가 선택하려할 때
   if(cnt==document.getElementById('rest').value && !input.value.includes(cdate)){
      alert("잔여연차를 초과하셨습니다.");
   
   //잔여연차가 있을 때
   } else if(cnt<document.getElementById('rest').value){
        
       //선택된 날짜 한번 더 클릭하여 해제
       if(input.value.includes(cdate)){
           target.style.background = 'transparent';
           target.style.color = 'var(--base-color)';
           
           pr.splice(pr.indexOf(cdate),1);
           if(pr.length==0){
               input.value = '';
               cnt--;
            }else{
              for(let i=0; i<pr.length; i++){
                 if(i==0) {input.value = pr[i];}
                 else input.value += (' / ' + pr[i]);
              }
               cnt--;
               let sCnt1 = " (" + cnt + ")";
               input.value+= sCnt1;
            }
           
       //클릭하여 선택
       } else {
          target.style.background='var(--imp-color)';
          target.style.color = 'white';
          cnt++;
          let sCnt2 = " (" + cnt + ")";
          pr.push(cdate);
          pr.sort();
          
          for(let i=0; i<pr.length; i++){
             if(i==0) input.value = pr[i];
             else{
                input.value += (' / ' + pr[i]);
             }
          }
           input.value += sCnt2;
       }
   //잔여연차를 초과한 상황에서 선택한 날짜를 해제할 때
     } else {
        target.style.background = 'transparent';
        target.style.color = 'var(--base-color)';
        
        input.value='';
        pr.splice(pr.indexOf(cdate),1);
        
        
        if(pr.length==0){
            input.value = '';
            cnt--;
         }else{
           for(let i=0; i<pr.length; i++){
              if(i==0) {input.value = pr[i];}
              else input.value += (' / ' + pr[i]);
           }
            cnt--;
            let sCnt1 = " (" + cnt + ")";
            input.value+= sCnt1;
         }
     }*/
}


