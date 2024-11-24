package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var (
	query string
	rootCmd = &cobra.Command{
		Use:   "patent-scraper",
		Short: "A Google Patents scraper",
		Run: func(cmd *cobra.Command, args []string) {
			if query == "" {
				fmt.Println("Please provide a search query using -q or --query")
				cmd.Help()
				os.Exit(1)
			}
			fmt.Printf("Searching Google Patents for: %s\n", query)
		},
	}
)

func init() {
	rootCmd.Flags().StringVarP(&query, "query", "q", "", "Search query for Google Patents")
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
} 