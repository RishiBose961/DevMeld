
export const boilerplates = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  javascript: `function main() {
  console.log("Hello, World!");
}

main();`,
  typescript: `function main(): void {
  console.log("Hello, World!");
}

main();`,
  python: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  go: `package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
};
