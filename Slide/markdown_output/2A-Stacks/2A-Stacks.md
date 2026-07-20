

Data Structures and Algorithms in Java
## 1
- Stack and Queue
## Part 1: Stack

Data Structures and Algorithms in Java
## 2
## Stack
## Objectives
## • Stacks
- Array-based stack
- Stack implemented by a singly linked list
- Stack class in java.util

Data Structures and Algorithms in Java
## 3
What is a stack?
## 3
•Astackis a linear data structure that can be accessed
only at one of its ends for storing and retrieving data
•A stackis a Last In, First Out (LIFO) data structure
•Anything added to the stack goes on the “top” of the
stack
•Anything removed from the stack is taken from the
“top” of the stack
•Things are removed in the reverse order from that in
which they were inserted

Data Structures and Algorithms in Java
## 4
Operations on a stack
## 4
•The following operations are needed to properly manage a
stack:
–clear()— Clear the stack
–isEmpty()— Check to see if the stack is empty
–push(el)— Put the elementelon the top of the stack
–pop()— Take the topmost element from the stack
–top()— Return the topmost element in the stack without
removing it
Operations on a stack

Data Structures and Algorithms in Java
## 5
## Stack Exceptions
## 5
•Attempting the execution of an operation of ADT may
sometimes cause an error condition, called an exception
•Exceptions are said to be “thrown” by an operation that
cannot be executed
•In the Stack ADT, operations pop and top cannot be
performed if the stack is empty
•Attempting the execution of pop or top on an empty stack
throws an StackEmptyException.

Data Structures and Algorithms in Java
## 6
Applications of Stacks
•Stacks are used for:
– Any sort of nesting (such as parentheses)
– Evaluating arithmetic expressions (and other sorts of
expression)
– Implementing function or method calls
– Keeping track of previous choices (as in backtracking)
– Keeping track of choices yet to be made (as in creating a
maze)
– Undo sequence in a text editor.
– Auxiliary data structure for algorithms
– Component of other data structures

Data Structures and Algorithms in Java
## 7
Stack in computer memory
- How does a stack in memory actually work?
– Each time a method is called, anactivation record (AR)is allocated
for it. This record usually contains the following information:
-    Parameters and local variables used in the called method.
-    A dynamic link, which is a pointer to the caller's activation
record.
-    Return addressto resume control by the caller, the address of the
caller’s instruction immediately following the call.
-    Return valuefor a method not declared as void. Because the size of
the activation record may vary from one call to another, the returned value is
placed right above the activation record of the caller.
– Each new activation record is placed on the top of therun-time
stack
– When a method terminates, its activation record is removed from
the top of the run-time stack
– Thus, the first AR placed onto the stack is the last one removed
ARis also called Stack frame

Data Structures and Algorithms in Java
## 8
## Array-based Stack - 1
•A simple way of implementing the Stack ADT
(abstract data type) uses an array
•We add elements from left to right
•A variable top keeps track of the index of the
top element
## S
## 012
top
## ...
Array-based stack

Data Structures and Algorithms in Java
## 9
•The array storing the stack elements
may become full
•A push operation will then throw a
FullStackException
– Limitation of the array-based
implementation
– Not intrinsic to the Stack ADT
## S
## 012
top
## ...
## Array-based Stack - 2
Array-based stack may become full

Data Structures and Algorithms in Java
## 10
Array implementation of a stack
## 10
class ArrayStack
{protected  Object [] a; int top,
max;
public ArrayStack()
{ this(50);
## }
public ArrayStack(int max1)
{ max = max1;
a =  new Object[max];
top = -1;
## }
protected  boolean grow()
{ int max1 = max + max/2;
Object [] a1 = new
## Object[max1];
if(a1 == null) return(false);
for(int i =0; i<=top; i++) a1[i] =
a[i];
a = a1;
return(true);
## }
public boolean isEmpty()
{ return(top==-1);}
public boolean isEmpty()
{ return(top==-1);}
public boolean isFull()
{ return(top==max-1);}
public void clear()
{ top=-1;}
public void push(Object x)
{ if(isFull() && !grow()) return;
a[++top] = x;
## }
Object top() throws EmptyStackException
{ if(isEmpty()) throw new
EmptyStackException();
return(a[top]);
## }
public Object pop() throws EmptyStackException
{ if(isEmpty()) throw new
EmptyStackException();
Object x = a[top];
top--;
return(x);
## }

Data Structures and Algorithms in Java
## 11
Linked implementation of a stack
## 11
class Node
{ public Object info;
public Node  next;
public Node(Object x, Node
p)
{ info=x; next=p; }
public Node(Object x)
{ this(x,null); }
## };
class LinkedStack
{ protected Node head;
public LinkedStack()
{ head = null; }
public boolean isEmpty()
{ return(head==null);}
public void push(Object x)
{ head = new
## Node(x,head);
## }
Object top() throws EmptyStackException
{ if(isEmpty()) throw new
EmptyStackException();
return(head.info);
## }
public Object pop() throws EmptyStackException
{ if(isEmpty()) throw new
EmptyStackException();
Object x = head.info;
head=head.next;
return(x);
## }

Data Structures and Algorithms in Java
## 12
Implementing a stack using
ArrayList & LinkedList classes in Java
## 12
import java.util.*;
class MyStack
{ArrayList h;
MyStack() {h = new ArrayList();}
boolean isEmpty()
{return(h.isEmpty());}
void push(Object x)
## {h.add(x);
## }
Object pop()
{if(isEmpty()) return(null);
return(h.remove(h.size()-1));
## }
## }
import java.util.*;
class MyStack
{LinkedList h;
MyStack() {h = new
LinkedList();}
boolean isEmpty()
{return(h.isEmpty());}
void push(Object x)
## {h.add(x);
## }
Object pop()
{if(isEmpty()) return(null);
return(h.removeLast());
## }
## }

Data Structures and Algorithms in Java
## 13
Convert decimal integer number to binary
number using a stack
## 13
public class Main
{public static void decToBin(int k)
{MyStack s = new MyStack();
System.out.print(k + " in binary system is: ");
while(k>0)
## {s.push(new Integer(k%2));
k = k/2;
## }
while(!s.isEmpty())
## System.out.print(s.pop());
## System.out.println();
## }
public static void main(String [] args)
{decToBin(11);
## System.out.println();
## }
## }

Data Structures and Algorithms in Java
## 14
Validate expression using stack - 1
## 14
We consider arithmetic expressions that may contain various pairs of grouping
symbols, such as
- Parentheses: “(” and “)”
- Braces: “{” and “}”
- Brackets: “[” and “]”
Each opening symbol must match its corresponding closing symbol. For example,
a left bracket, “[,” must match a corresponding right bracket, “],” as in the following
expression
## [(5+x)−(y+z)].
The following examples further illustrate this concept:
## • Correct: ( )(( )){([( )])}
## • Correct: ((( )(( )){([( )])}))
## • Incorrect: )(( )){([( )])}
## • Incorrect: ({[ ])}
## • Incorrect: (
We leave the precise definition of a matching group of symbols to Exercise R-6.6.

Data Structures and Algorithms in Java
## 15
Validate expression using stack - 2
## 15
An Algorithm for Matching Delimiters:
An important task when processing arithmetic expressions is to
make sure their delimiting symbols match up correctly. We can use
a stack to perform this task with a single left-to-right scan of the
original string.
Each time we encounter an opening symbol, we push that symbol
onto the
stack, and each time we encounter a closing symbol, we pop a
symbol from the stack (assuming it is not empty) and check that
these two symbols form a valid pair. If we reach the end of the
expression and the stack is empty, then the original expression was
properly matched. Otherwise, there must be an opening delimiter on
the stack without a matching symbol. If the length of the original
expression isn, the algorithm will make at mostncalls to push and
ncalls to pop.

Data Structures and Algorithms in Java
## 16
Matching Parentheses and HTML Tags
## 16
Another application of matching delimiters is in the validation of
markup languages such as HTML or XML. HTML is the standard
format for hyperlinked documents on the Internet and XML is an
extensible markup language used for a variety of structured data
sets.
In an HTML document, portions of text are delimited byHTMLtags.
A simple opening HTML tag has the form “<name>” and the
corresponding closing tag has the form “</name>”. For example,
the <body> tag has the matching </body> tag at the close of that
document.
Ideally, an HTML document should have matching tags, although
most browsers tolerate a certain number of mismatching tags. We
can use stack to check whether an HTML document is valid or not.

Data Structures and Algorithms in Java
## 17
Stack class in Java
A Stack class implemented in the java.util package is an
extension of class Vector to which one constructor and five
methods are added.
Stack class in Java

Data Structures and Algorithms in Java
## 18
## Summary
## 18
•A stack is a linear data structure that can be
accessed at only one of its ends for storing
and retrieving data.
•A stack is called an LIFO structure: last in/first
out.

Data Structures and Algorithms in Java
## 19
Reading at home
Text book: Data Structures and Algorithms in Java.
- 6 Stacks, Queues, and Deques 225
## • 6.1 Stacks - 226