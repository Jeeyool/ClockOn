<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/css/update_memberinfo.css">
<link rel="stylesheet" href="/css/component_board.css">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="content-wrapper">
	<main>
		<h2>직원급여관리</h2>
		<div class="sub-tab">
			<span class="tab-group1">
				<h4>서브메뉴</h4> <span class="wrap"><button class="button-three" onclick="location.href='memberlist'">기본정보</button></span>
				<span class="wrap"><button class="button-three" onclick="location.href='leaveInfo'">연차</button></span>
			</span> <span class="tab-group2">
				<h4>급여정보</h4> <span class="wrap"><button class="button-two">일괄수정</button></span>
				<span class="wrap"><button class="button-two">수정</button></span> <span
				class="wrap"><button class="button-two">삭제</button></span>
			</span>
		</div>
		<table class="tbl-ex emp-tbl">
			<summary>총 직원수 : ${cnt}</summary>
			<thead>
				<tr class="search-tr">
					<th></th>
					<th><input type="text" class="search" placeholder="검색.."></th>
					<th><input type="text" class="search" placeholder="검색.."></th>
					<th><input type="text" class="search" placeholder="검색.."></th>
					<th><input type="text" class="search" placeholder="검색.."></th>
					<th><input type="text" class="search" placeholder="검색.."></th>
					<th><input type="text" class="search" placeholder="검색.."></th>
					<th><input type="text" class="search" placeholder="검색.."></th>
					<th><input type="text" class="search" placeholder="검색.."></th>
					<th><input type="text" class="search" placeholder="검색.."></th>
				</tr>
			<thead>
				<tr class="title-tr">
					<th></th>
					<th>본부</th>
					<th>부서</th>
					<th>사번</th>
					<th>이름</th>
					<th>직급</th>
					<th>연봉</th>
					<th>월급</th>
					<th>입사일</th>
					<th>퇴사일</th>
				</tr>
			</thead>
			<c:forEach var="list" items="${list}">
				<tr>
					<td><input type="checkbox" id="empCheck"></td>
					<td>${list.org_groupname}</td>
					<td>${list.emp_dept}</td>
					<td>${list.emp_id}</td>
					<td>${list.emp_name}</td>
					<td>${list.emp_posi}</td>
					<td>${list.emp_sal}</td>
					<td>${list.emp_pay}</td>
					<td>${list.emp_join}</td>
					<td>${list.emp_resi}</td>
				</tr>
			</c:forEach>
		</table>
	</main>
</div>