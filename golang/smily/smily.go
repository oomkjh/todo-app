package main

import (
	"fmt"
	"regexp"
)

func CountSmilyFace(text []string) int {
	re := regexp.MustCompile(`^[:;][-~]?[)D]$`)
	count := 0
	for _, face := range text {
		if re.MatchString(face) {
			count++
		}
	}
	return count
}

func main() {
	fmt.Println(CountSmilyFace([]string{":)", ";(", ";}", ":-D"}))       // 2
	fmt.Println(CountSmilyFace([]string{";D", ":-(", ":-)", ";~)"}))     // 3
	fmt.Println(CountSmilyFace([]string{";]", ":[", ";*", ":$", ";-D"})) // 1
	fmt.Println(CountSmilyFace([]string{}))                              // 0
}
