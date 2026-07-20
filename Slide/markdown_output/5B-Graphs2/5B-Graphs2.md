

Data Structures and Algorithms in Java
## 1
## 5. Graphs
## Part 2

Data Structures and Algorithms in Java
## 2
## Objectives
## 2
## • Spanning Trees
– Prim algorithm
– Kruskal algorithm
## • Eulerian Graphs

Data Structures and Algorithms in Java
## 3
Minimum Spanning Tree (MST)
## 3
Suppose we wish to connect all the computers in a new office
building using the least amount of cable. We can model this
problem using an undirected, weighted graphGwhose vertices
represent the computers, and whose edges represent all the
possible pairs (u,v) of computers, where the weightw(u,v) of
edge (u,v) is equal to the amount of cable needed to connect
computeruto computerv. Rather than computing a shortest-path
tree from some particular vertexv, we are interested instead in
finding a treeTthat contains all the vertices ofGand has the
minimum total weight over all such trees. Algorithms for finding
such a tree are the focus of this section.
## Introduction

Data Structures and Algorithms in Java
## 4
MST - Problem Definition
## 4
Given an undirected, weighted graphG, we are interested
in finding a treeTthat contains all the vertices inGand
minimizes the sum
A tree, such as this, that contains every vertex of a
connected graphGis said to be aspanningtree, and the
problem of computing a spanning treeTwith smallest
total weight is known as theminimumspanningtree(or
MST) problem.

Data Structures and Algorithms in Java
## 5
Spanning Tree example
## 5
In graph theory, atreeis an undirected, connected graph without
simple cycles.Aspanning treeis a tree that includes all vertices of
the original graph
A graph representing
the airline connections
between seven cities
Two spanning tree of the graph

Data Structures and Algorithms in Java
## 6
❑Minimum Spanning Trees (MST) are useful in many
applications, for example, finding the shortest total
connections for a set of edges.
❑If we are running cable to the nodes, representing
cities, and we wish to minimize cable cost, the MST
would be a viable option.
❑An algorithms will be presented: Prim-Jarnık MST
algorithm and Kruskal’s Algorithm.
## 6
## Spanning Tree Application

Data Structures and Algorithms in Java
## 7
MST algorithms
In this section, we discuss two classic algorithms for solving the
MST problem. These algorithms are both applications of the
greedymethod, which is based on choosing objects to join a
growing collection by iteratively picking an object that minimizes
some cost function. The first algorithm we discuss is the Prim-
Jarn ́ık algorithm, which grows the MST from a single root vertex,
much in the same way as Dijkstra’s shortest-path algorithm. The
second algorithm we discuss is Kruskal’s algorithm, which “grows”
the MST in clusters by considering edges in ondecreasing order of
their weights.
In order to simplify the description of the algorithms, we assume,
in the following, that the input graphGis undirected (that is, all its
edges are undirected) and simple (that is, it has no self-loops and
no parallel edges). Hence, we denote the edges ofGas
unordered vertex pairs (u,v).

Data Structures and Algorithms in Java
## 8
MST Prim-Jarnik Algorithm
## 8
Initialize a tree with a single vertex, chosen
arbitrarily from the graph.
Grow the tree by one edge: of the edges that
connect the tree to vertices not yet in the tree,
find the minimum-weight edge, and transfer it to
the tree.
Repeat step 2 (until all vertices are in the tree).

Data Structures and Algorithms in Java
## 9
Prim-Jarnik Algorithm demo
## 9
A spanning tree of graph (a) found with Prim’s algorithm starting
with the vertex 0. The  vertices are selected in the following order:
## 0, 1, 7, 6, 5, 2, 8, 3, 9

Data Structures and Algorithms in Java
## 10
## Kruskal Algorithm
## 10
(A popular algorithm, all edges are ordered by
weight, each edge is checked to see whether it can be
considered part of the tree. It is added to the tree
if no cycle arises after its inclusion)
KruskalAlgorithm(weighted connected undirected graph)
tree = null;
edges = sequence of all edges of graph sorted by weight
for (i = 1; i<=|E| and |tree|<|V| - 1; i++)
if e_i from edges does not form a cycle with edges in tree
add e_i to tree

Data Structures and Algorithms in Java
## 11
## 11
A spanning tree of graph (a) found with Kruskal’s algorithm. The
vertices are selected in the following order: 1, 2, 2, 3, 3, 4, 7, 8, 8
Kruskal Algorithm – demo
## (a)

Data Structures and Algorithms in Java
## 12
Euler cycle and paths
Eulerpath:  a path traversing all the edges of the graph
exactly once
Eulercycle: a cycle traversing all the edges of the
graph exactly once
Has Euler cycle
Has Euler path,
but no Euler cycle
No Euler cycle
no Euler path

Data Structures and Algorithms in Java
## 13
The Bridges of Königsberg
## A
## C
## B
## D
Is it possible to start at some
location, travel across all the
bridges without crossing any
bridge twice, and return to
the same starting point?
Rephrasing in terms of Euler cycles:
## C
## AD
## B
Kneiphof island on Pregel river and  7
bridges built in 18-th century in
Königsberg town (Kaliningrad).

Data Structures and Algorithms in Java
## 14
Necessary and sufficient conditions
for Euler cycles
Theorem1:A connected multigraph has an Euler cycle if
and only if each of its vertices has even degree.
## C
## AD
## B
Has Euler cycle
Has Euler path,
but no Euler cycle
No Euler cycle
no Euler path
Euler cycle???
path???

Data Structures and Algorithms in Java
## 15
Necessary condition for Euler cycle
Theorem 1:A connected multigraph has an Euler cycle
if andonly ifeach of its vertices has even degree.
ProofSketch,PART1:
•Assume the graph has an Euler cycle.
•Observe that every time the cycle passes through a
vertex, it contributes 2 to the vertex’s degree
(since the cycle enters via an edge incident with this
vertex and leaves via another such edge)

Data Structures and Algorithms in Java
## 16
Sufficient condition for Euler cycle
Theorem 1:A connected multigraph has an Euler cycleif
and only if each of its vertices has even degree.
ProofSketch,PART2:Demonstrate an algorithm for
finding the Euler cycle in a graph where all vertices
have even degree.
•Assume every vertex in a multigraphGhas even
degree. Start at an arbitrary non-isolated vertexv
## 0
## ,
choose an arbitrary edge (v0,v1), then choose an
arbitrary unused edge from v1 and so on. Then after a
finite number of steps the process will arrive at the
starting vertex v0, yielding a cycle with distinct edges.
•If the cycle includes all edges of G, this will be an Euler
cycle; if not, begin the procedure again from a vertex
contained in this cycle and splice the two cycles
together; continue until all edges are used.

Data Structures and Algorithms in Java
## 17
## Note
In the above procedure, once you entered a vertex v, there will
always be another unused edge to exit v because v has an even
degree and only an even number of the edges incident with it had
been used before you entered it.
The only edge from which you may not be able to exit after
entering it is v
## 0
(because an odd number of edges incident with v
## 0
have been used as you didn’t enter it at the beginning) , but if you
have reached v
## 0
, then you have already constructed a required
cycle.

Data Structures and Algorithms in Java
## 18
A procedure for constructing an Euler cycle
AlgorithmEuler(G)
//Input: Connected graphGwith all vertices having even degrees
//Output: Euler cycle
Construct acycleinG
Remove all the edges ofcyclefromGto get subgraphH
whileHhas edges
find a non-isolated vertexvthat is both incycleand inH
//the existence of such a vertex is guaranteed byG’s connectivity
constructsubcycleinH
splicesubcycleintocycleatv
remove all the edges ofsubcyclefromH
returncycle

Data Structures and Algorithms in Java
## 19
## Example
## G
cycle
## 1231
## H
## 1357
## 2468
## 1357
## 2468
## 1357
## 2468
subcycle
## 34653
## 1357
## 2468
splicing
## 34653
into
## 1231
## H
## 1357
## 2468
## 1357
## 2468

Data Structures and Algorithms in Java
## 20
## Example (cont.)
## H
## 1357
## 2468
## H
## 1357
## 2468
splicing
6786 into
## 12346531
## 1357
## 2468
## Eulercycleobtained
## 12346786531
## 1357
## 2468

Data Structures and Algorithms in Java
## 21
Algorithm for finding an Euler cycle from
the vertex X using stack
AlgorithmEuler(G)
//Input: Connected graphGwith all vertices having even degrees
//Output: Euler cycle
declare a stack S of characters
declare empty array E (which will contain Euler cycle)
push the vertex X to S
while(S is not empty)
{ch = top element of the stack S
if ch is isolated then remove it from the stack and put it to E
else
select the first vertex Y (byalphabetorder), which is adjacent
to ch,push  Y  to S and remove the edge (ch,Y) from the graph
## }
the last array E obtained is an Euler cycle of the graph

Data Structures and Algorithms in Java
## 22
Necessary and sufficient conditions for Euler paths
Theorem2.A connected multigraph has an Euler
path but not an Euler cycle if and only if it has
exactly two vertices of odd degree.

Data Structures and Algorithms in Java
## 23
Hamilton paths and cycles - 1
Hamiltoncycle: visits every vertex of the graph exactly once before
returning, as the last step, to the starting  vertex.
## Examples:
Hamiltonpath: visits every vertex of the graph exactly once.

Data Structures and Algorithms in Java
## 24
Finding Hamilton’s cycles using Backtracking
Given the graph G = (V,E) and X is a vertex of  G. Suppose
there exists at least one Hamilton Cycle for the graph. The
following is a backtracking  algorithm for finding one Hamilton
cycle from the vertex  X:
declare an empty array H (which will contain Hamilton cycle)
(1) Put the vertex  X  to  H
(2) Check if H is a Hamilton cycle then stop, else go to (3)
(3) Consider the last vertex Y in H, if there is/are vertex(es)
adjacent to Y, select an adjacent vertex  Z  and put it to H. If
there no adjacent vertex, remove Y from H and denote it as a
bad selection (so you do not select it in the same way again).
Go to (2).

Data Structures and Algorithms in Java
## 25
List all Hamilton’s cycles using Backtracking

Data Structures and Algorithms in Java
## 26
Graph coloring - 1
- In graph theory, graph coloring is a way ofcoloring the vertices of
a graph such that no two adjacent vertices share the same color.
- If the chromatic number of the graph G
is denoted by χ(G). A graph for which k =
χ(G) is called k-colorable. For a complete
- Thechromatic numberof a graph is the
minimum number of colors one can use to
color the vertices of the graph so that no
two adjacent vertices are the same color.
graph χ(K
n
)=n, χ(C
## 2n
)=2, χ(C
## 2n+1
)=3; and for bipartite graph
χ(G)≤ 2.
- Determining a chromatic number of a graph G is an NP-complete
problem.

Data Structures and Algorithms in Java
## 27
•Sequential coloringestablishes the sequence of vertices
and a sequence of colors before coloring them, and then
color the next vertex with the lowest number possible
Graph coloring - 2
The complexity of this algorithm is O(|V|
## 2
## )
sequentialColoringAlgorithm(graph =(V,E))
putverticesinacertainorderv
## P1
, v
## P2
## , . . . ,v
## Pv
## ;
putcolorsinacertainorderc
## 1
, c
## 2
## , . . . ,c
k
## ;
for i = 1to|V|
j=thesmallestindexofcolorthatdoesnotappearinany neighborof
v
## Pi
## ;
color(v
## Pi
) = c
j
## ;

Data Structures and Algorithms in Java
## 28
## Graph Coloring - 3
(a) A graph used for coloring; (b) colors assigned to vertices with
the sequential coloring algorithm that orders vertices by index number;
(c) vertices are put in the largest first sequence; (d) graph coloring obtained
with the Brélaz algorithm

Data Structures and Algorithms in Java
## 29
## Summary
•Spanning Trees
– Prim algorithm
– Kruskal algorithm
•Eulerian and Hamilton Graphs
•Graph coloring
## 29

Data Structures and Algorithms in Java
## 30
Reading at home
Text book: Data Structures and Algorithms in Java
## • 14.7 Minimum Spanning Trees - 662
- 14.7.1 Prim-Jarn ́ık Algorithm - 664
## • 14.7.2 Kruskal’s Algorithm - 667
- (Euler's tour and Euler's cycle, exercise C.14.5.2)