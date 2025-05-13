package main

import "fmt"

func FindOddNumber(text []int) int {
	result := 0
	for _, n := range text {
		result ^= n
	}
	return result
}

func main() {
	fmt.Println(FindOddNumber([]int{7}))                                     // 7
	fmt.Println(FindOddNumber([]int{0}))                                     // 0
	fmt.Println(FindOddNumber([]int{1, 1, 2}))                               // 2
	fmt.Println(FindOddNumber([]int{0, 1, 0, 1, 0}))                         // 0
	fmt.Println(FindOddNumber([]int{1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1})) // 4
}
