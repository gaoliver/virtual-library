import React from 'react';
import renderer from 'react-test-renderer';
import {ToastModel, showToast} from './ToastWarning';
import {describe} from '@jest/globals';
import {NativeBaseProvider} from 'native-base';

describe('ToastWarning component UI and function', () => {
  it('ToastModel renders correctly', () => {
    const tree = renderer
      .create(
        <NativeBaseProvider>
          <ToastModel description="Test Description" />
        </NativeBaseProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('showToast renders correctly', () => {
    const tree = renderer.create(showToast('Test Message')).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
