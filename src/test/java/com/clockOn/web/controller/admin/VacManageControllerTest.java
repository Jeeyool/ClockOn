package com.clockOn.web.controller.admin;

import static org.junit.Assert.fail;

import java.io.IOException;

import org.junit.Test;

public class VacManageControllerTest {

	@Test
	public void confirmReq() throws IOException {
		String holi_period = "21-01-03 / 23-20-19 / 29-39-92 (3)";
		String[] off = holi_period.split(" / ");
		String last = off[off.length-1];
		off[off.length-1] = last.substring(0, 8); //��¥���� �ɰ��� �迭�� ����
		
		for(String o : off) {
			System.out.println(o);
		}
		
	}
}