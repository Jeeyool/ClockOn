var page = 1;
var last;
var html;


//	console.log("innerHeight:" + innerHeight);
//	console.log("scroll(innerHeight+scrollTop) : " + scroll);
//	console.log("전체높이 : " + height);
//		console.log("끝");
function getMap(p){
	//let search = $('.search');
	search = [];
	
	//console.log(search);
	$('.search').each(function(){
		let s ={
			field : $(this).attr('id'),
			keyword : $(this).val()
		};
		search.push(s);
	});
	var jsonData = JSON.stringify(search);
	$.ajax({
		url : "searchlist",
		type:"post",
//		dateType:'json', @ResponseBody를 담아놓았기 때문에 자동 처리
		data : {
			"search":jsonData,
			"page": p
			},
		success : function(data){
			var member = data.member;
			var cnt = data.totRows;
			var cntRows = $('#totRows');
			last = data.lastNum;
//			$("#ajax").remove();
//			var html='<tbody id="ajax">';
			if(p==1) {html=''; page=1; cntRows.html('검색 결과 : ' +cnt+ '건');}
//			if(p!=undefined) 
			for(var i=0; i<member.length; i++){
				html += "<tr>"+
							"<td class='gname'>"+member[i].org_groupname+"</td>"+
							"<td class='tname'>"+member[i].emp_dept+"</td>" +
							"<td class='eid'>"+member[i].emp_id+"</td>" +
							"<td class='ename'>"+member[i].emp_name+"</td>" +
							"<td class='eposi'>"+member[i].emp_posi+"</td>" +
							"<td class='etel'>"+member[i].emp_tel+"</td>" +
							"<td class='email'>"+member[i].emp_email+"</td>";
				if(member[i].emp_level == "ROLE_ADMIN")
					html +="<td class='elevel'>관리자</td>";
				if(member[i].emp_level == "ROLE_MEMBER")
					html +="<td class='elevel'>직원</td>";
					html+="</tr>";
			}
			$("#ajax").html(html);
			scrollbar();
		},
		error : function(xhr){
			console.log(xhr.status);
			console.log(xhr.responseText);
//			alert("Error code : " + xhr.status);
		}
	});
}


window.onload = function(){
    getMap();
}

