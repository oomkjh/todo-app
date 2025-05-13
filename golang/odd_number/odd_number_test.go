package main

import "testing"

func TestFindOddNumber(t *testing.T) {
	tests := []struct {
		input    []int
		expected int
	}{
		{[]int{7}, 7},
		{[]int{0}, 0},
		{[]int{1, 1, 2}, 2},
		{[]int{0, 1, 0, 1, 0}, 0},
		{[]int{1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1}, 4},
	}

	for _, tt := range tests {
		if result := FindOddNumber(tt.input); result != tt.expected {
			t.Errorf("FindOddNumber(%v) = %d; want %d", tt.input, result, tt.expected)
		}
	}
}
