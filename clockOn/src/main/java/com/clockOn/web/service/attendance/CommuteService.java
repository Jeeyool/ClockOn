package com.clockOn.web.service.attendance;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.clockOn.web.entity.Page;
import com.clockOn.web.entity.commute.Commute;
import com.clockOn.web.entity.commute.CommuteDetail;

public interface CommuteService {
	/* ���̴� */
	// ��ٹ�ư ó��
	public String work_day(String emp_id);
	// ��� ���
	public int hiSuccess(String emp_id);
	// �ڽ��� ����� ������ ��������
	public List<Commute> listRecord(Map<String, String> map);
	// ��� ���
	public int byeSuccess(String emp_id);
	// ������ - ��� ������ ���±�� ����Ʈ �������� (��¥��)
	public List<CommuteDetail> allByList(List<Map<String, String>> mapList, Page page);
	// ���� - ���� ���� ����Ʈ �������� (��¥ ��)
	public List<CommuteDetail> myList(Map<String, String> map);
	// ����
	public int cntRows(List<Map<String, String>> mapList);
	
	/* ������ */
	// ��� �ο� ī��Ʈ
	public int goWorkCount();
	// ����� �ο� ī��Ʈ
	public int notWorkCount();
	// �ް� �ο� ī��Ʈ
	public int holidayCount();
	// ���� �ο� ī��Ʈ
	public int lateCount();
	// �ڽ��� �ش� �� ��� ��� Ȯ��
	public int thisMonthWork(String emp_id);
	// �ڽ��� �ش� �� ���� ��� Ȯ��
	public int thisMonthLate(String emp_id);
	// �ڽ��� �ش� �� �޹� ��� Ȯ��
	public int thisMonthHoli(String emp_id);
	// �ڽ��� �ش� �� �ٹ� �ð� Ȯ��
	public int thisMonthTime(String emp_id);
	// �ڽ��� �ش� �� ��� ��� Ȯ��
	public int thisMonthAbsent(String emp_id);
	// �ڽ��� �ش� �⵵ ��� ��� Ȯ��
	public int thisYearWork(String emp_id);
	// �ڽ��� �ش� �⵵ ���� ��� Ȯ��
	public int thisYearLate(String emp_id);
	// �ڽ��� �ش� �⵵ �޹� ��� Ȯ��
	public int thisYearHoli(String emp_id);
	// �ڽ��� �ش� �⵵ �ٹ� �ð� Ȯ��
	public int thisYearTime(String emp_id);
	// �ڽ��� �ش� �⵵ ��� ��� Ȯ��
	public int thisYearAbsent(String emp_id);
	// ��� ������ ���±�� ��ȸ
	public List<HashMap<String, Object>> allMemberCommute();

}