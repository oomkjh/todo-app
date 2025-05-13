package main

import (
	"fmt"
)

func Manipulate(text []string) []string {
	input := ""
	for _, t := range text {
		input += t
	}

	resultMap := make(map[string]struct{})
	var backtrack func(path, rest string)
	backtrack = func(path, rest string) {
		if len(rest) == 0 {
			resultMap[path] = struct{}{}
			return
		}
		for i := 0; i < len(rest); i++ {
			backtrack(path+string(rest[i]), rest[:i]+rest[i+1:])
		}
	}

	backtrack("", input)

	result := make([]string, 0, len(resultMap))
	for k := range resultMap {
		result = append(result, k)
	}

	return result
}

func main() {
	fmt.Println(Manipulate([]string{"a"}))                // [a]
	fmt.Println(Manipulate([]string{"a", "b"}))           // [ab ba]
	fmt.Println(Manipulate([]string{"a", "b", "c"}))      // [abc acb bac bca cab cba]
	fmt.Println(Manipulate([]string{"a", "a", "b", "b"})) // [aabb abab abba baab baba bbaa]
}
