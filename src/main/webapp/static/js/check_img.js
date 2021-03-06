/**
 * 이미지 필수, 이미지 없으면 리턴
 */
function checkImg() {
	var imgname = document.getElementById('empPic').value;
	if (imgname == "") {
		alert("이미지를 첨부해주세요.");
		return false;
	}
	if(checkDept())	return true;
	else return false;
}



/**
 * 이미지 확장자 검사 & 리스너 등록 → 프리뷰 구현 */

//1번방법 : 이미지 객체 타입으로 이미지 확장자 밸리데이션
	var validateType = function(img){
		//세 가지 값을 가지는 배열에서 img.type을 찾는(indexOf) 메소드 : 찾으면 양수를 반환한다
	  return (['image/jpeg','image/jpg','image/png'].indexOf(img.type) > -1);
	}
			
	//파일 선택 필드에 이벤트 리스너 등록

window.onload=function(){
	
	document.getElementById('empPic').addEventListener('change', function(e){
	  let elem = e.target;
	  if(validateType(elem.files[0])){
	      let preview = document.querySelector('#preview');
	      preview.src = URL.createObjectURL(elem.files[0]); //파일 객체에서 이미지 데이터 가져옴.
	      //document.querySelector('.dellink').style.display = 'block'; // 이미지 삭제 링크 표시
	      preview.onload = function() {
	          URL.revokeObjectURL(preview.src); //URL 객체 해제
	      }
	  }else{
		alert("이미지 파일이 아닙니다.");
	  }
	});
}	