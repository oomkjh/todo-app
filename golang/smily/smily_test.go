package main

import "testing"

func TestCountSmilyFace(t *testing.T) {
	tests := []struct {
		input    []string
		expected int
	}{
		{[]string{":)", ";(", ";}", ":-D"}, 2},
		{[]string{";D", ":-(", ":-)", ";~)"}, 3},
		{[]string{";]", ":[", ";*", ":$", ";-D"}, 1},
		{[]string{}, 0},
	}

	for _, tt := range tests {
		if result := CountSmilyFace(tt.input); result != tt.expected {
			t.Errorf("CountSmilyFace(%v) = %d; want %d", tt.input, result, tt.expected)
		}
	}
}
