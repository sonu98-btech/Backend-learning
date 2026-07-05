import React, { useState, useEffect } from 'react';

// Preset Battle Data to populate initial history and simulation cases
const PRESET_BATTLES = [
  {
    id: "battle-1",
    problem: "write the fabonacci series code using cpp",
    solution_1: `# Fibonacci Series in C++\n\nHere's a C++ program to generate the Fibonacci series:\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, first = 0, second = 1, next;\n\n    cout << "Enter the number of terms: ";\n    cin >> n;\n\n    cout << "Fibonacci Series: ";\n\n    for (int i = 0; i < n; i++) {\n        if (i <= 1) {\n            next = i;\n        } else {\n            next = first + second;\n            first = second;\n            second = next;\n        }\n        cout << next << " ";\n    }\n\n    return 0;\n}\n\`\`\`\n\n## Alternative Versions:\n\n### 1. Using Recursion:\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nint fibonacci(int n) {\n    if (n <= 1)\n        return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\nint main() {\n    int n;\n    cout << "Enter the number of terms: ";\n    cin >> n;\n\n    cout << "Fibonacci Series: ";\n    for (int i = 0; i < n; i++) {\n        cout << fibonacci(i) << " ";\n    }\n    return 0;\n}\n\`\`\`\n\n### 2. Using Memoization:\n\`\`\`cpp\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint fib(int n, vector<int>& memo) {\n    if (n <= 1) return n;\n    if (memo[n] != -1) return memo[n];\n    memo[n] = fib(n-1, memo) + fib(n-2, memo);\n    return memo[n];\n}\n\nint main() {\n    int n;\n    cout << "Enter the number of terms: ";\n    cin >> n;\n\n    vector<int> memo(n+1, -1);\n    cout << "Fibonacci Series: ";\n    for (int i = 0; i < n; i++) {\n        cout << fib(i, memo) << " ";\n    }\n    return 0;\n}\n\`\`\`\n\nThe iterative approach runs in O(n) time and O(1) space, making it highly optimal. Recursion takes exponential O(2^n) time, which memoization optimizes back to O(n) space and time.`,
    solution_2: `Below is a simple C++ program to generate the Fibonacci series up to a specified number of terms:\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\n// Function to generate Fibonacci series\nvoid generateFibonacci(int n) {\n    int t1 = 0, t2 = 1, nextTerm;\n\n    cout << "Fibonacci Series: ";\n\n    for (int i = 1; i <= n; ++i) {\n        // Prints the first two terms\n        if (i == 1) {\n            cout << t1 << " ";\n            continue;\n        }\n        if (i == 2) {\n            cout << t2 << " ";\n            continue;\n        }\n\n        // Calculate the next term\n        nextTerm = t1 + t2;\n        t1 = t2;\n        t2 = nextTerm;\n\n        // Print the next term\n        cout << nextTerm << " ";\n    }\n    cout << endl;\n}\n\nint main() {\n    int n;\n\n    // Input the number of terms required\n    cout << "Enter the number of terms: ";\n    cin >> n;\n\n    // Generate and print the Fibonacci series\n    generateFibonacci(n);\n\n    return 0;\n}\n\`\`\`\n\n### Explanation:\n1. **Variables**: \n   - \`t1\` and \`t2\` store the first two terms.\n   - \`nextTerm\` stores the calculated term.\n2. **Loop**:\n   - The loop runs \`n\` times to output the series.\n3. **Input/Output**:\n   - Requests term count from the console.\n\n### Output Example:\n\`\`\`\nEnter the number of terms: 10\nFibonacci Series: 0 1 1 2 3 5 8 13 21 34\n\`\`\``,
    judge: {
      solution_1_score: 10,
      solution_2_score: 9.5,
      solution_1_reasoning: "Solution 1 is outstanding because it provides three different ways to implement the Fibonacci sequence in C++: Iterative, Recursive, and Memoized (Dynamic Programming). This gives the user a comprehensive understanding of the problem and its efficiency trade-offs. The code is clean, correct, and handles edge cases well.",
      solution_2_reasoning: "Solution 2 is also very good and follows good software engineering practices by encapsulating the Fibonacci generation logic inside a dedicated function rather than putting it directly in 'main'. It also provides a clear explanation and example output. It gets a slightly lower score only because it does not showcase multiple approaches (like recursion or memoization) as Solution 1 does."
    }
  },
  {
    id: "battle-2",
    problem: "write a python function to solve the knapsack problem efficiently",
    solution_1: `# Knapsack Problem in Python (Standard DP)\n\nHere's an O(N * W) 2D dynamic programming solution:\n\n\`\`\`python\ndef knapsack_2d(weights, values, capacity):\n    n = len(weights)\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    \n    for i in range(1, n + 1):\n        for w in range(1, capacity + 1):\n            if weights[i-1] <= w:\n                dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w])\n            else:\n                dp[i][w] = dp[i-1][w]\n                \n    return dp[n][capacity]\n\n# Time Complexity: O(n * capacity)\n# Space Complexity: O(n * capacity)\n\`\`\`\nThis implementation uses a standard dynamic programming grid.`,
    solution_2: `# Knapsack Problem in Python (Space-Optimized DP)\n\nWe can optimize the space complexity from O(N * W) to O(W) using a 1D array by iterating backwards:\n\n\`\`\`python\ndef knapsack_optimized(weights, values, capacity):\n    dp = [0] * (capacity + 1)\n    \n    for i in range(len(weights)):\n        # Iterate backwards to prevent using the same item multiple times\n        for w in range(capacity, weights[i] - 1, -1):\n            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])\n            \n    return dp[capacity]\n\n# Time Complexity: O(n * capacity)\n# Space Complexity: O(capacity) - Space Optimized\n\`\`\`\nThis is highly optimized and clean.`,
    judge: {
      solution_1_score: 8.5,
      solution_2_score: 9.8,
      solution_1_reasoning: "Correct implementation and easy to follow. However, the space complexity uses a full 2D grid which is inefficient for larger inputs when only the previous row is needed.",
      solution_2_reasoning: "Excellent. The model correctly identified the 1D space optimization optimization which reduces memory consumption significantly, making it superior for production environments."
    }
  },
  {
    id: "battle-3",
    problem: "write a javascript function for binary search",
    solution_1: `# Binary Search in JS (Iterative)\n\nHere is the iterative binary search method:\n\n\`\`\`javascript\nfunction binarySearch(arr, target) {\n    let left = 0;\n    let right = arr.length - 1;\n    \n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if (arr[mid] === target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n\`\`\`\nTime Complexity: O(log n) | Space Complexity: O(1)`,
    solution_2: `# Binary Search in JS (Recursive)\n\nHere is the recursive binary search implementation:\n\n\`\`\`javascript\nfunction binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {\n    if (left > right) return -1;\n    \n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    \n    if (arr[mid] < target) {\n        return binarySearchRecursive(arr, target, mid + 1, right);\n    }\n    return binarySearchRecursive(arr, target, left, mid - 1);\n}\n\`\`\`\nTime Complexity: O(log n) | Space Complexity: O(log n) due to call stack.`,
    judge: {
      solution_1_score: 9.6,
      solution_2_score: 8.8,
      solution_1_reasoning: "Iterative binary search is standard and preferred in JavaScript due to constant O(1) space complexity and avoiding any potential call stack overflow.",
      solution_2_reasoning: "The recursive implementation is clean and logically correct. However, it takes extra memory on the call stack, making it less optimal than the iterative approach."
    }
  }
];

const PRESETS_LIST = [
  "write the fabonacci series code using cpp",
  "write a python function to solve the knapsack problem efficiently",
  "write a javascript function for binary search",
  "design a thread-safe singleton class in java",
  "implement quicksort in rust with custom pivot selection"
];

// Helper to format code token highlights inside HTML pre block
function syntaxHighlight(code, lang) {
  if (!code) return '';
  // Simple regex-based syntax highlighter for C++, JS, Python
  const keywords = /\b(const|let|var|function|def|return|if|else|for|while|import|from|class|include|using|namespace|int|void|float|double|public|private|static|struct|fn|let\s+mut|impl|use)\b/g;
  const strings = /(["'`])(.*?)\1/g;
  const comments = /(\/\/.*|#.*|\/\*[\s\S]*?\*\/)/g;
  const numbers = /\b(\d+)\b/g;
  const functions = /\b([a-zA-Z_]\w*)(?=\()/g;

  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Apply classes for styling
  html = html.replace(comments, '<span class="code-comment">$1</span>');
  html = html.replace(strings, '<span class="code-string">$1$2$1</span>');
  html = html.replace(keywords, '<span class="code-keyword">$1</span>');
  html = html.replace(numbers, '<span class="code-number">$1</span>');
  html = html.replace(functions, '<span class="code-function">$1</span>');

  return html;
}

// Lightweight Markdown + Code Block Parser
function MarkdownRenderer({ content }) {
  if (!content) return null;

  // Split by code blocks
  const parts = content.split(/(```[a-zA-Z]*\n[\s\S]*?\n```)/g).filter(p => p && p.trim() !== "");

  return (
    <div className="space-y-4">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          // It's a code block
          const lines = part.split('\n');
          const firstLine = lines[0]; // e.g. ```cpp or ```
          const lang = firstLine.replace('```', '').trim() || 'code';
          const codeLines = lines.slice(1, lines.length - 1).join('\n');
          const highlightedHtml = syntaxHighlight(codeLines, lang);

          return (
            <div key={index} className="glass-card rounded-lg overflow-hidden border border-white/10 my-4 shadow-lg">
              <div className="bg-surface-container/60 px-4 py-2 border-b border-white/5 flex justify-between items-center text-xs text-on-surface-variant font-code">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary-container inline-block"></span>
                  {lang.toUpperCase()} CODE
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(codeLines)}
                  className="hover:text-primary-container p-1 rounded transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
                  title="Copy Code"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  <span>Copy</span>
                </button>
              </div>
              <div className="p-4 bg-[#080d0d] overflow-x-auto text-xs md:text-sm font-code leading-relaxed text-[#dce4e4]">
                <pre><code dangerouslySetInnerHTML={{ __html: highlightedHtml }}></code></pre>
              </div>
            </div>
          );
        } else {
          // Render plain markdown elements (paragraphs, headers, lists)
          const lines = part.split('\n');
          return (
            <div key={index} className="space-y-2 text-on-surface/90 text-sm md:text-base leading-relaxed">
              {lines.map((line, lineIdx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;

                // Headers
                if (trimmed.startsWith('### ')) {
                  return <h5 key={lineIdx} className="font-headline font-semibold text-base mt-4 mb-2 text-primary-fixed">{trimmed.replace('### ', '')}</h5>;
                }
                if (trimmed.startsWith('## ')) {
                  return <h4 key={lineIdx} className="font-headline font-bold text-lg mt-5 mb-2 text-white border-b border-white/5 pb-1">{trimmed.replace('## ', '')}</h4>;
                }
                if (trimmed.startsWith('# ')) {
                  return <h3 key={lineIdx} className="font-headline font-extrabold text-xl mt-6 mb-3 text-[#00f2ff]">{trimmed.replace('# ', '')}</h3>;
                }

                // Bullet points
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  const itemText = trimmed.substring(2);
                  return (
                    <ul key={lineIdx} className="list-disc pl-5 my-1 text-on-surface-variant">
                      <li>{renderInlineStyles(itemText)}</li>
                    </ul>
                  );
                }

                // Numbered lists
                if (/^\d+\.\s/.test(trimmed)) {
                  const match = trimmed.match(/^(\d+)\.\s(.*)/);
                  return (
                    <ol key={lineIdx} className="list-decimal pl-5 my-1 text-on-surface-variant">
                      <li value={parseInt(match[1])}>{renderInlineStyles(match[2])}</li>
                    </ol>
                  );
                }

                return <p key={lineIdx} className="my-1.5">{renderInlineStyles(trimmed)}</p>;
              })}
            </div>
          );
        }
      })}
    </div>
  );
}

// Inline formatting: Bold **text** and inline `code`
function renderInlineStyles(text) {
  // Bold regex
  const boldParts = text.split(/(\*\*.*?\*\*)/g);
  return boldParts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      // Check if there is inline code inside bold
      return <strong key={index} className="text-white font-semibold">{content}</strong>;
    }
    // Inline code regex
    const codeParts = part.split(/(`.*?`)/g);
    return codeParts.map((subPart, subIndex) => {
      if (subPart.startsWith('`') && subPart.endsWith('`')) {
        return (
          <code key={`${index}-${subIndex}`} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-code text-xs text-[#74f5ff]">
            {subPart.slice(1, -1)}
          </code>
        );
      }
      return subPart;
    });
  });
}

// Circular Animated Progress Ring for Judge Evaluation
function ScoreProgressRing({ score, maxScore = 10, isPurple = false }) {
  const radius = 35;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20 shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 70 70">
        {/* Background track circle */}
        <circle
          className="stroke-[#232b2c]"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Foreground animated value circle */}
        <circle
          className={`transition-all duration-1000 ease-out ${isPurple ? 'stroke-[#b600f8] drop-shadow-[0_0_8px_rgba(182,0,248,0.4)]' : 'stroke-[#00f2ff] drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]'}`}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Absolute Centered Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-headline font-bold text-lg ${isPurple ? 'text-[#ebb2ff]' : 'text-[#74f5ff]'}`}>
          {score}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-on-surface-variant/70">/10</span>
      </div>
    </div>
  );
}

export default function App() {
  const [history, setHistory] = useState(() => {
    // Populate session storage or start with default presets
    return PRESET_BATTLES;
  });
  const [activeBattleId, setActiveBattleId] = useState("battle-1");
  const [inputProblem, setInputProblem] = useState("");
  const [isSimulated, setIsSimulated] = useState(true); // Default to simulated for safety and ease of use
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Active battle details
  const activeBattle = history.find(b => b.id === activeBattleId);

  // Auto scroll sidebar state or setup responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Preset Click
  const loadPreset = (presetText) => {
    setInputProblem(presetText);
  };

  // Submit Battle Request
  const startBattle = async (e) => {
    e.preventDefault();
    if (!inputProblem.trim()) return;

    setLoading(true);
    setError("");

    if (isSimulated) {
      // Simulation mode: wait 1.5 seconds, then create simulated battle object
      setTimeout(() => {
        // Try to find if we have a match in PRESET_BATTLES, otherwise generate a customized response
        const matchingPreset = PRESET_BATTLES.find(
          p => p.problem.toLowerCase() === inputProblem.trim().toLowerCase()
        );

        let newBattle;
        if (matchingPreset) {
          newBattle = {
            ...matchingPreset,
            id: `battle-${Date.now()}`
          };
        } else {
          // Dynamic Simulated fallback
          newBattle = {
            id: `battle-${Date.now()}`,
            problem: inputProblem,
            solution_1: `# Solution 1 (Model: Mistral)\n\nHere is a simple response for your problem: **"${inputProblem}"**.\n\n\`\`\`python\ndef solve_problem():\n    # Dynamic simulated response\n    print("Processing: ${inputProblem}")\n    return True\n\`\`\`\n\n### Complexity:\n- Time Complexity: O(1) constant simulation time.\n- Space Complexity: O(1) constant storage space.`,
            solution_2: `# Solution 2 (Model: Cohere)\n\nBelow is an alternative implementation to address your query: **"${inputProblem}"**.\n\n\`\`\`javascript\nfunction handleProblem() {\n    // Alternative simulated answer\n    console.log("Solving query...");\n    return {\n        success: true,\n        status: "simulated"\n    };\n}\n\`\`\`\n\n### Complexity:\n- Time Complexity: O(1) basic computation.\n- Space Complexity: O(1) auxiliary overhead.`,
            judge: {
              solution_1_score: 8.0,
              solution_2_score: 8.5,
              solution_1_reasoning: `Model 1 provided a clean Python block. The code matches standard practices and sets clear variables.`,
              solution_2_reasoning: `Model 2 delivered an elegant JavaScript structure. It scored slightly higher because it structured the response object to include state feedback.`
            }
          };
        }

        setHistory(prev => [newBattle, ...prev]);
        setActiveBattleId(newBattle.id);
        setInputProblem("");
        setLoading(false);
      }, 1500);

    } else {
      // Live API Call to Backend Server
      try {
        const response = await fetch("http://localhost:3000/invoke", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ problem: inputProblem })
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();
        if (data && data.result) {
          const result = data.result;
          const newBattle = {
            id: `battle-${Date.now()}`,
            problem: result.problem || inputProblem,
            solution_1: result.solution_1 || "No solution returned",
            solution_2: result.solution_2 || "No solution returned",
            judge: {
              solution_1_score: result.judge?.solution_1_score ?? 0,
              solution_2_score: result.judge?.solution_2_score ?? 0,
              solution_1_reasoning: result.judge?.solution_1_reasoning || "No reasoning provided.",
              solution_2_reasoning: result.judge?.solution_2_reasoning || "No reasoning provided."
            }
          };
          setHistory(prev => [newBattle, ...prev]);
          setActiveBattleId(newBattle.id);
          setInputProblem("");
        } else {
          throw new Error("Invalid response format received from backend");
        }
      } catch (err) {
        console.error(err);
        setError(`Failed to connect to backend server: ${err.message}. Automatically fell back to Simulation Mode.`);
        // Auto fallback to simulation so the user is never stuck
        setIsSimulated(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to wipe the clash logs?")) {
      setHistory([]);
      setActiveBattleId("");
    }
  };

  return (
    <div className="bg-[#0a0a0c] text-[#dce4e4] min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      
      {/* Background Neon light beams */}
      <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full bg-[#00f2ff]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-300px] right-[-300px] w-[600px] h-[600px] rounded-full bg-[#b600f8]/5 blur-[120px] pointer-events-none"></div>

      {/* Sidebar Nav */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-[#0c1213]/90 md:bg-transparent backdrop-blur-2xl border-r border-white/5 
        py-6 px-4 shrink-0 transition-transform duration-300 transform flex flex-col h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        {/* Sidebar Header Brand */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-full bg-[#00f2ff]/10 flex items-center justify-center border border-[#00f2ff]/30 shadow-[0_0_12px_rgba(0,242,255,0.2)]">
            <span className="material-symbols-outlined text-[#00f2ff] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
          </div>
          <div>
            <h1 className="font-headline font-bold text-base tracking-wider text-white">NEURAL_ARENA</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#00f2ff] font-code">System: Online</p>
          </div>
        </div>

        {/* Action button */}
        <div className="mb-6 px-1">
          <h3 className="text-[10px] uppercase font-code tracking-widest text-on-surface-variant/60 mb-2.5">Preset Arenas</h3>
          <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
            {PRESETS_LIST.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => loadPreset(preset)}
                className="w-full text-left text-xs p-2 rounded bg-white/5 hover:bg-[#00f2ff]/10 hover:text-white border border-white/5 transition-all text-on-surface-variant font-medium truncate cursor-pointer"
                title={preset}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex justify-between items-center px-1 mb-3">
            <h3 className="text-[10px] uppercase font-code tracking-widest text-on-surface-variant/60">Clash Logs</h3>
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-[10px] text-red-400 hover:text-red-300 font-semibold cursor-pointer active:scale-95 transition-all"
              >
                CLEAR ALL
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {history.length === 0 ? (
              <div className="text-center py-6 text-xs text-on-surface-variant/50 border border-dashed border-white/5 rounded-lg">
                No battles logged yet.
              </div>
            ) : (
              history.map((battle, index) => {
                const s1 = battle.judge?.solution_1_score ?? 0;
                const s2 = battle.judge?.solution_2_score ?? 0;
                const winner = s1 > s2 ? 'Mistral' : s2 > s1 ? 'Cohere' : 'Draw';
                const isActive = battle.id === activeBattleId;
                
                return (
                  <div
                    key={battle.id}
                    onClick={() => {
                      setActiveBattleId(battle.id);
                      // On mobile, auto close sidebar when selection changes
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`
                      glass-card p-3 rounded-lg border-l-2 cursor-pointer hover:bg-white/5 transition-all
                      ${isActive ? 'border-l-[#00f2ff] bg-white/5' : 'border-l-white/10'}
                    `}
                  >
                    <p className="font-semibold text-xs text-white truncate">{battle.problem}</p>
                    <div className="flex justify-between items-center mt-2 text-[10px]">
                      <span className="text-on-surface-variant font-code">Mistral vs Cohere</span>
                      <span className={`px-1.5 py-0.5 rounded font-bold text-[9px] ${
                        winner === 'Mistral' ? 'bg-[#00f2ff]/10 text-[#00f2ff]' :
                        winner === 'Cohere' ? 'bg-[#b600f8]/10 text-[#ebb2ff]' :
                        'bg-white/10 text-white'
                      }`}>
                        {winner === 'Draw' ? 'DRAW' : `${winner.toUpperCase()} WON`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer info inside Sidebar */}
        <div className="mt-auto pt-4 border-t border-white/5 text-center text-[10px] text-on-surface-variant/60 font-code">
          <p>© 2026 NEURAL ARENA</p>
          <p>Hybrid Web/App Canvas</p>
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/60 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <div className="h-16 border-b border-white/5 px-4 md:px-8 flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded bg-white/5 border border-white/10 text-on-surface-variant hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-lg block">
                {sidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>
            <h2 className="font-headline font-bold text-sm md:text-base text-white tracking-wide flex items-center gap-2">
              <span>BATTLEFIELD CANVAS</span>
              <span className="hidden md:inline-block h-4 w-px bg-white/10"></span>
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-on-surface-variant/80 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Engine
              </span>
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] md:text-xs font-code text-on-surface-variant">Mode:</span>
            <div className="bg-white/5 border border-white/10 p-0.5 rounded-lg flex items-center">
              <button
                type="button"
                onClick={() => setIsSimulated(false)}
                className={`px-2.5 py-1 text-[10px] md:text-xs rounded font-medium transition-all cursor-pointer ${
                  !isSimulated 
                    ? 'bg-[#00f2ff] text-black font-semibold shadow-[0_0_8px_rgba(0,242,255,0.4)]'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Live API
              </button>
              <button
                type="button"
                onClick={() => setIsSimulated(true)}
                className={`px-2.5 py-1 text-[10px] md:text-xs rounded font-medium transition-all cursor-pointer ${
                  isSimulated 
                    ? 'bg-[#b600f8] text-white font-semibold shadow-[0_0_8px_rgba(182,0,248,0.4)]'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Simulation
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Battle Board */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs md:text-sm rounded-lg flex items-start gap-3">
              <span className="material-symbols-outlined text-red-400 text-lg shrink-0">error</span>
              <div>
                <p className="font-semibold">Connection Alert</p>
                <p className="opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Prompt Entry Panel */}
          <div className="glass-card rounded-xl p-4 md:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00f2ff] animate-neon-pulse"></div>
            <form onSubmit={startBattle} className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[#00f2ff] text-lg">terminal</span>
                <label className="text-[10px] uppercase font-code tracking-widest text-[#00f2ff] font-bold">Deploy New Arena Battle</label>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3">
                <textarea
                  value={inputProblem}
                  onChange={(e) => setInputProblem(e.target.value)}
                  placeholder="Enter your problem statement here (e.g. 'write a quicksort function in python')..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-on-surface-variant/50 focus:outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff]/30 transition-all resize-none h-16 min-h-16"
                  disabled={loading}
                />
                
                <button
                  type="submit"
                  disabled={loading || !inputProblem.trim()}
                  className={`
                    px-6 py-3 rounded-lg font-headline font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 select-none
                    ${loading 
                      ? 'bg-white/10 text-on-surface-variant cursor-not-allowed border border-white/5' 
                      : 'bg-[#00f2ff] text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_25px_rgba(0,242,255,0.5)]'
                    }
                  `}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-on-surface-variant/40 border-t-white animate-spin"></div>
                      <span>Fighting...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
                      <span>Engage Battle</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Active Battle Board Results */}
          {!activeBattle ? (
            <div className="glass-card rounded-xl p-12 text-center border border-dashed border-white/5">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-3 block">rocket_launch</span>
              <h3 className="font-headline font-bold text-lg text-white mb-1">Begin the AI Showcase</h3>
              <p className="text-xs md:text-sm text-on-surface-variant/70 max-w-md mx-auto">
                No active clash selected. Choose an item from the history log on the left or enter a custom prompt above to start the arena.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Challenge Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/2 border border-white/5 p-4 rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-bold tracking-wider uppercase inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                      CLASH LOGGED
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-code">Record: {activeBattle.id}</span>
                  </div>
                  <h3 className="font-headline font-bold text-white text-base md:text-lg">
                    Prompt: "{activeBattle.problem}"
                  </h3>
                </div>
                <div className="px-3.5 py-1 rounded bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[#74f5ff] text-xs font-code font-bold uppercase shrink-0">
                  Mistral vs Cohere
                </div>
              </div>

              {/* Side by side solutions grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* Solution 1: Mistral */}
                <div className="flex flex-col space-y-4">
                  {/* Card Title Header */}
                  <div className="glass-card p-3 rounded-lg border-t-2 border-t-[#00f2ff] flex justify-between items-center shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/20 flex items-center justify-center text-[#00f2ff]">
                        <span className="material-symbols-outlined text-base">psychology</span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-xs text-white">MODEL_ONE: Mistral Large</h4>
                        <p className="text-[9px] text-[#74f5ff] font-code">PROVIDER: Mistral AI | Latency: 380ms</p>
                      </div>
                    </div>
                    {activeBattle.judge.solution_1_score >= activeBattle.judge.solution_2_score && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-bold tracking-wide uppercase border border-emerald-500/20">
                        WINNER
                      </span>
                    )}
                  </div>
                  {/* Content Container */}
                  <div className="glass-card rounded-xl p-5 flex-1 flex flex-col border border-white/5">
                    <MarkdownRenderer content={activeBattle.solution_1} />
                  </div>
                </div>

                {/* Solution 2: Cohere */}
                <div className="flex flex-col space-y-4">
                  {/* Card Title Header */}
                  <div className="glass-card p-3 rounded-lg border-t-2 border-t-[#b600f8] flex justify-between items-center shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#b600f8]/10 border border-[#b600f8]/20 flex items-center justify-center text-[#ebb2ff]">
                        <span className="material-symbols-outlined text-base">neurology</span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-xs text-white">MODEL_TWO: Cohere Command R+</h4>
                        <p className="text-[9px] text-[#ebb2ff] font-code">PROVIDER: Cohere Inc | Latency: 440ms</p>
                      </div>
                    </div>
                    {activeBattle.judge.solution_2_score >= activeBattle.judge.solution_1_score && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-bold tracking-wide uppercase border border-emerald-500/20">
                        WINNER
                      </span>
                    )}
                  </div>
                  {/* Content Container */}
                  <div className="glass-card rounded-xl p-5 flex-1 flex flex-col border border-white/5">
                    <MarkdownRenderer content={activeBattle.solution_2} />
                  </div>
                </div>

              </div>

              {/* Judge Verdict Panel */}
              <div className="glass-card rounded-xl p-5 md:p-6 border border-white/10 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00f2ff] to-[#b600f8]"></div>
                
                <h4 className="font-headline font-bold text-sm text-white mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
                  <span className="material-symbols-outlined text-yellow-500">gavel</span>
                  <span>COURTROOM VERDICT & JUDGE SCORING</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  
                  {/* Score 1 details */}
                  <div className="flex gap-4 p-4 rounded-lg bg-white/2 border border-white/5 items-center">
                    <ScoreProgressRing score={activeBattle.judge.solution_1_score} />
                    <div className="space-y-1">
                      <h5 className="font-headline font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff]"></span>
                        Mistral Large Score
                      </h5>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {activeBattle.judge.solution_1_reasoning}
                      </p>
                    </div>
                  </div>

                  {/* Score 2 details */}
                  <div className="flex gap-4 p-4 rounded-lg bg-white/2 border border-white/5 items-center">
                    <ScoreProgressRing score={activeBattle.judge.solution_2_score} isPurple={true} />
                    <div className="space-y-1">
                      <h5 className="font-headline font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b600f8]"></span>
                        Cohere Command R+ Score
                      </h5>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {activeBattle.judge.solution_2_reasoning}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Win Summary Badge Banner */}
                <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="text-xs font-code text-on-surface-variant/80">
                    Judge Model: <span className="text-[#00f2ff]">Gemini-1.5-Flash</span> (Strict Evaluation)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-on-surface-variant">Verdict:</span>
                    <span className={`px-2.5 py-1 rounded text-xs font-headline font-black tracking-wide border shadow-md uppercase ${
                      activeBattle.judge.solution_1_score > activeBattle.judge.solution_2_score 
                        ? 'bg-[#00f2ff]/20 text-[#00f2ff] border-[#00f2ff]/30 shadow-[#00f2ff]/10'
                        : activeBattle.judge.solution_2_score > activeBattle.judge.solution_1_score
                        ? 'bg-[#b600f8]/20 text-[#ebb2ff] border-[#b600f8]/30 shadow-[#b600f8]/10'
                        : 'bg-white/10 text-white border-white/20'
                    }`}>
                      {activeBattle.judge.solution_1_score > activeBattle.judge.solution_2_score 
                        ? 'Mistral Large Won the Clash!'
                        : activeBattle.judge.solution_2_score > activeBattle.judge.solution_1_score
                        ? 'Cohere Command R+ Won the Clash!'
                        : 'It\'s an absolute draw!'}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
