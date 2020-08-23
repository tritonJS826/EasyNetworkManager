import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
// import TestRenderer from 'react-test-renderer';

import Button from './Button';

const onClick = jest.fn();
const props = {
  name: 'test3',
  onClick,
};

describe('Button', () => {
  describe('should be render', () => {
    it('renders with a text', () => {
      const div = document.createElement('div');
      act(() => {
        ReactDOM.render(
          <Button name="test" onClick={() => {}}>
            <>test</>
          </Button>,
          div,
        );
      });
      expect(div.textContent).toBe('test');
      ReactDOM.unmountComponentAtNode(div);
    });
    it('Button contain textContent', () => {
      const div = document.createElement('div');
      act(() => {
        ReactDOM.render(
          <Button name="test" onClick={() => {}}>
            <>test2</>
          </Button>,
          div,
        );
      });
      expect(div.querySelector('.test').textContent).toContain('test2');
      ReactDOM.unmountComponentAtNode(div);
    });
  });
  describe('func should work when press on button', () => {
    it('changes value when clicked', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      act(() => {
        ReactDOM.render(
          <Button name="test3" onClick={onClick}>
            <>test3</>
          </Button>,
          div,
        );
      });

      // получаем элемент button
      const button = div.querySelector('.test3');
      expect(button.innerHTML).toBe('test3');

      // и кликаем на него
      act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(onClick).toHaveBeenCalledTimes(1);

      // и еще покликаем
      act(() => {
        for (let i = 0; i < 5; i += 1) {
          button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      });
      expect(onClick).toHaveBeenCalledTimes(6);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
