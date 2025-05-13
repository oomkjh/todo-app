package main

import (
	"reflect"
	"sort"
	"testing"
)

func TestManipulate(t *testing.T) {
	tests := []struct {
		input    []string
		expected []string
	}{
		{[]string{"a"}, []string{"a"}},
		{[]string{"a", "b"}, []string{"ab", "ba"}},
		{[]string{"a", "b", "c"}, []string{"abc", "acb", "bac", "bca", "cab", "cba"}},
		{[]string{"a", "a", "b", "b"}, []string{"aabb", "abab", "abba", "baab", "baba", "bbaa"}},
	}

	for _, tt := range tests {
		got := Manipulate(tt.input)
		sort.Strings(got)
		sort.Strings(tt.expected)

		if !reflect.DeepEqual(got, tt.expected) {
			t.Errorf("Manipulate(%v) = %v; want %v", tt.input, got, tt.expected)
		}
	}
}
