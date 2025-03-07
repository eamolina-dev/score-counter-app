import React from 'react';
import { render } from '@testing-library/react-native';
import PointsGroup from '../PointsGroup';
import Match from '../../assets/svg/match.svg';

jest.mock('../../assets/svg/match.svg', () => 'Match'); // Mocking the SVG component

describe('PointsGroup Component', () => {
  test('should render the correct number of matches based on points', () => {
    const { getAllByType } = render(
      <PointsGroup groupPoints={5} points={3} height={100} width={100} />
    );

    // Verifying that only 3 matches are visible (due to opacity control)
    const matches = getAllByType('Match');
    expect(matches.length).toBe(5); // There are 5 Match components rendered in total
    expect(matches[0].props.style.opacity).toBe(100); // match1 should be visible
    expect(matches[1].props.style.opacity).toBe(100); // match2 should be visible
    expect(matches[2].props.style.opacity).toBe(100); // match3 should be visible
    expect(matches[3].props.style.opacity).toBe(0); // match4 should be hidden
    expect(matches[4].props.style.opacity).toBe(0); // match5 should be hidden
  });

  test('should pass the correct transform value for tilt', () => {
    const { getAllByType } = render(
      <PointsGroup groupPoints={5} points={3} height={100} width={100} />
    );

    const matches = getAllByType('Match');
    expect(matches[0].props.transform[0].rotate).toBe('0deg');
    expect(matches[1].props.transform[0].rotate).toBe('90deg');
    expect(matches[2].props.transform[0].rotate).toBe('180deg');
    expect(matches[3].props.transform[0].rotate).toBe('270deg');
    expect(matches[4].props.transform[0].rotate).toBe('45deg');
  });
});
