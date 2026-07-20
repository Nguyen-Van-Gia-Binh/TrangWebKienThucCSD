

Introduction to
## Data Structures &
## Algorithms
11Data Structures and Algorithms in Java

What is data structure?
In computer science, simply speaking adatastructureisawayof
storingdatain a computer so thatitcanbeusedefficiently. A
data structure is a way of organizing data that considersnotonly
theitemsstored,butalsotheirrelationshipto each other.
Advance knowledge about the relationship between data items
allows designing of efficient algorithms for the manipulation of data.
Often acarefullychosendatastructurewillallowamore
efficientalgorithmto be used. The choice of the data structure
often begins from the choice of an abstract data structure. A well-
designed data structure allows a variety of critical operations to be
performed on using as little resources, both execution time and
memory space, as possible.
Different kinds of data structures are suited to different kinds of
applications, and some are highly specialized to certain tasks. For
example,B-treesare particularly well-suited for implementation of
databases, whilecompilerimplementations usually usehash tables
to look up identifiers.
22Data Structures and Algorithms in Java

Why data structure is important in
computer science?
Data structures are used in almost every program or software
system. Data structures provide a means to manage huge
amounts of data efficiently, such as largedatabasesand
internet indexing services. Usually, efficient data structures are
a key to designing efficientalgorithms. Some formal design
methods andprogramming languagesemphasize data
structures, rather than algorithms, as the key organizing factor
in software design.Niklaus Emil Wirth (born February 15,
1934) is aSwiss computer scientistsaid:
## Algorithms + Data Structures = Programs
33Data Structures and Algorithms in Java

Basic types of data structure
## •files
## •lists
## •arrays
In programming, the termdatastructurerefers to a
scheme for organizing related pieces of information.
The basic types of data structures include:
Each of these basic structures has many variations
and allows different operations to be performed on
the data  .
## •records
## •trees
## •tables
44Data Structures and Algorithms in Java

What is algorithm?
Aformulaorsetofstepsforsolvingaparticularproblem. To be an
algorithm, a set of rules must be unambiguous and have a clear stopping
point. Algorithms can be expressed in any language, from natural languages
like English or French to programming languages like FORTRAN.
•We use algorithms every day. For example, a recipe for baking a
cake is an algorithm.
•Most programs, with the exception of some artificial intelligence
applications, consist of algorithms.
•Inventing elegant algorithms -- algorithms that are simple and
require the fewest steps possible -- is one of the principal challenges
in programming.
The word “algorithm” derives from the name of the mathematician, Abu Ja'far Mohammed
ibn-Musa al-Khwarizmi, who was an Arab, probably from what is now Southern Uzbekistan,
who taught at the Caliph's Palace of Wisdom in Baghdad in the 9th Century, and is one the
most important mathematicians in history. Through Latin translations of his work, al-
Khwarizmi introduced to Europe the Hindu-Arabic base 10 numerals - the use of which came
to be known as algorithm in English.
55Data Structures and Algorithms in Java

Algorithm example
66Data Structures and Algorithms in Java

What are the properties of an algorithm?
-  Input- an algorithm accepts zero or more inputs
-  Output- it produces at least one output.
-  Finiteness- an algorithm terminates after a finite
numbers of steps.
-  Definiteness- each step in algorithm is unambiguous.
This means that the action specified by the step cannot
be interpreted (explain the meaning of) in multiple ways
& can be performed without any confusion.
-  Effectiveness- it consists of basic instructions that are
realizable. This means that the instructions can be
performed by using the given inputs in a finite amount of
time.
-  Generality- it must work for a general set of inputs.
77Data Structures and Algorithms in Java

How to represent algorithms?
•Usenatural languages
– too verbose
– too "context-sensitive"- relies on experience of reader
•Useformal programming languages
– too low level
– requires us to deal with complicated syntax of programming
language
•Pseudo-Code(alias programming language) - natural language
constructs modeled to look like statements available in many
programming languages.
•Flowchart(diagram) - Aflowchartis a common type of chart, that
represents an algorithm or process, showing the steps as boxes of
various kinds, and their order by connecting these with arrows.
Flowcharts are used in analyzing, designing, documenting or managing
a process or program in various fields.
88Data Structures and Algorithms in Java

Algorithm representation examples
Natural language:
find max(a,b,c)
-   Assign x = a
-   If b great than x then
assign x=b
-   If c great than x then
assign x=c;
-   Result: x => max(a,b,c)
## Pseudo-code:
function
max(a,b,c)
Input: a, b, c
## Output:
max(a,b,c)
x = a;
if b > x
then x = b;
if c > x
then x = c;
return x;
x := a
b>x
x := b
c >
x
x := c
end
begin
## True
## False
## True
## True
## Flowchart:
Problem:find the greatest of three numbers
99Data Structures and Algorithms in Java

Data Structures and Algorithms
•Most algorithms operate on data collections,
so define
•Collection Abstract Data Type (ADT)
## – Methods
## • Constructor / Destructor
## • Add / Edit / Delete
## • Find
## • Sort
## • ....
1010Data Structures and Algorithms in Java