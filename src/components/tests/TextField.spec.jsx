import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // Arrange - 테스트를 위한 환경 만들기
  // jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영된다.
  // jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현한 것
  await render(<TextField className="my-class" />);

  // Act - 테스트할 동작 발생
  // 렌더링에 대한 검증이기 때문에 생략

  // Assert - 올바른 동작이 실행되었는지 검증
  // vitest의 expect 함수를 사용하여 기대 결과를 검증할 수 있다.
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );

  // className이란 내부 prop이나 state 값을 검증하지 않는게 관건
  // 렌더링되어 DOM 구조가 올바르게 변경되었는지 확인하는 것이다. -> 최종적으로 사용자가 보는 결과는 DOM이기 때문이다.
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);
    // 단언(assertion) -> 테스트가 통과하기 위한 조건 -> 검증 실행
    expect(
      screen.getByPlaceholderText('텍스트를 입력해 주세요.'),
    ).toBeInTheDocument();
  });

  it('placeholder prop에 따라 placeholder text가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);
    expect(
      screen.getByPlaceholderText('상품명을 입력해 주세요.'),
    ).toBeInTheDocument();
  });
});
