/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

import {it} from '@jest/globals';
import renderer from 'react-test-renderer';

describe('General App testing', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });
});
