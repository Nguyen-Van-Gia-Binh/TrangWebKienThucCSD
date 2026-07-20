

Data Structures and Algorithms in Java
## 1
## 5. Graphs
## Part 1

Data Structures and Algorithms in Java
## 2
## Objectives
## 2
## • Graph Introduction
- Graph definition
## • Graph Terminology
- Graph applications
## • Graph Representation
## • Graph Traversals
## • Shortest Paths
– Dijsktra algorithm
– Floyd algorithm

Data Structures and Algorithms in Java
## 3
## Graph Introduction
## 3
Agraphis a way of representing relationships that
exist between pairs of objects. That is, a graph is a
set ofobjects, calledvertices, together with a
collection of pairwise connections between them,
callededges. Graphs have applications in modeling
many domains, including mapping, transportation,
computer networks, and electrical engineering. By
the way, this notion of a “graph” should not be
confused with bar charts and function plots, as
these kinds of “graphs” are unrelated to the topic of
this chapter.

Data Structures and Algorithms in Java
## 4
Graph definition
## 4
In briefly saying, agraphis a collection of
vertices and the connections between them

Data Structures and Algorithms in Java
## 5
## Graph Terminology - 1
•Edges in a graph are eitherdirectedorundirected. An edge
(u,v) is said to bedirectedfromutovif the pair (u,v) is
ordered, withuprecedingv. An edge (u,v) is said to be
undirectedif the pair (u,v) is not ordered. Undirected edges
are sometimes denoted with set notation, as {u,v}.
•If all the edges in a graph are undirected, then we say the
graph is anundirectedgraph. Likewise, adirectedgraph, also
called adigraph, is a graph whose edges are all directed. A
graph that has both directed and undirected edges is often
called amixedgraph.
## 5
Note that an undirected or mixed graph can be converted into a directed
graph by replacing every undirected edge (u,v) by the pair of directed edges
(u,v) and (v,u). It is often useful, however, to keep undirected and mixed
graphs represented as they are, for such graphs have several applications.

Data Structures and Algorithms in Java
## 6
## Graph Examples - 1
•Acity mapcan be modeled as agraphwhose vertices are
intersections or dead ends, and whose edges are stretches of
streets without intersections. This graph has both undirected
edges, which correspond to stretches of two-way streets, and
directed edges, which correspond to stretches of one-way
streets. Thus, in this way, a graph modeling a city map is a
mixed graph.
•Physical examples of graphs are present in theelectrical
wiringandplumbing networksof a building. Such networks
can be modeled as graphs, where each connector, fixture, or
outlet is viewed as a vertex, and each uninterrupted stretch of
wire or pipe is viewed as an edge. Such graphs are actually
components of much larger graphs, namely the local power
and water distribution networks.
## 6

Data Structures and Algorithms in Java
## 7
## Graph Terminology - 2
•The two vertices joined by an edge are called theendvertices
(orendpoints) of the edge. If an edge is directed, its first
endpoint is itsoriginand the other is thedestinationof the
edge. Two verticesuandvare said to beadjacentif there is
an edge whose end vertices areuandv. An edge is said to be
incidentto a vertex if the vertex is one of the edge’s
endpoints. Theoutgoingedgesof a vertex are the directed
edges whose origin is that vertex. Theincomingedgesof a
vertex are the directed edges whose destination is that vertex.
Thedegreeof a vertexv, denoteddeg(v), is the number of
incident edges ofv. If deg(u) = 0 then u is calledisolated
vertex. Thein-degreeandout-degreeof a vertexvare the
number of the incoming and outgoing edges ofv, and are
denoted indeg(v) and outdeg(v), respectively.
## 7

Data Structures and Algorithms in Java
## 8
## Graph Examples - 2
•We can study air transportation by constructing a graphG,
called aflight network, whose vertices are associated with
airports, and whose edges are associated with flights. In graph
G, the edges are directed because a given flight has a specific
travel direction. The endpoints of an edgeeinGcorrespond
respectively to the origin and destination of the flight
corresponding toe.
## 8
Two airports are adjacent
inGif there is a flight that
flies between them, and
an edgeeis incident to a
vertexvinGif the flight
foreflies to or from the
airport forv.

Data Structures and Algorithms in Java
## 9
## Graph Terminology - 3
•The definition of a graph refers to the group of edges as acollection,
not aset, thus allowing two undirected edges to have the same end
vertices, and for two directed edges to have the same origin and the
same destination. Such edges are calledparalleledgesormultiple
edges. A flight network can contain parallel edges. A graph containing
multiple edges but no loops is calledmultigraph.
•Another special type of edge is one that connects a vertex to itself.
Namely, we say that an edge (undirected or directed) is aself-loopif
its two endpoints coincide. A self-loop may occur in a graph associated
with a city map, where it would correspond to a “circle” (a curving
street that returns to its starting point).
•With few exceptions, graphs do not have parallel edges or self-loops.
Such graphs are said to besimple. Thus, we can usually say that the
edges of a simple graph are asetof vertex pairs (and not just a
collection). A graph is considered simple unless otherwise specified.
## 9

Data Structures and Algorithms in Java
## 10
## Graph Terminology - 4
•Apathis a sequence of alternating vertices and edges that
starts at a vertex and ends at a vertex such that each edge is
incident to its predecessor and successor vertex. Acycleis a
path that starts and ends at the same vertex, and that includes
at least one edge. We say that a path issimpleif each vertex in
the path is distinct, and we say that a cycle issimpleif each
vertex in the cycle is distinct, except for the first and last one.
Adirectedpathis a path such that all edges are directed and
are traversed along their direction. Adirectedcycleis similarly
defined.
•If a graph is simple, we may omit the edges when describing
pathPor cycleC, as these are well defined, in which casePis a
list of adjacent vertices andCis a cycle of adjacent vertices.
## 10

Data Structures and Algorithms in Java
## 11
## Graph Terminology - 5
•A undirected graph G isconnectedif, for any two vertices, there is a path.
•A directed graphGisstronglyconnectedif for any two vertices u and v,
there is a directed path.Adirected graphis calledweakly connectedif
replacing all of its directed edges with undirected edges produces a connected
(undirected) graph.
•Asubgraphof a graphGis a graphHwhose vertices and edges are
subsets of the vertices and edges ofG, respectively. Aspanningsubgraph
ofGis a subgraph ofGthat contains all the vertices of the graphG. If a
graphGis not connected,
•its maximal connected subgraphs are called theconnectedcomponents
ofG. Aforestis a graph without cycles. Atreeis a connected forest, that
is, a connected graph without cycles. Aspanningtreeof a graph is a
spanning subgraph that is a tree. (Note that this definition of a tree is
somewhat different from the one given in Chapter 4, as there is not
necessarily a designated root.)
## 11

Data Structures and Algorithms in Java
## 12
•If the vertex is removed from a graph (along with
incident edges) and there is no way to find a path
fromatob,then the graph is split into two separate
subgraphs calledarticulation points, orcut-vertices
•If an edge causes a graph to be split into two
subgraphs, it is called abridgeorcut-edge
•Connected subgraphs with no articulation points or
bridges are calledblocks
## 12
We can use depth first traverse to check
the connectivity of a graph
## Graph Terminology - 6

Data Structures and Algorithms in Java
## 13
## Graph Examples - 3
•Perhaps the most talked about graph today is theInternet,
which can be viewed as a graph whose vertices are computers
and whose (undirected) edges are communication connections
between pairs of computers on the Internet. The computers
and the connections between them in a single domain, like
wiley.com, form a subgraph of the Internet. If this subgraph is
connected, then two users on computers in this domain can
send email to one another without having their information
packets ever leave their domain. Suppose the edges of this
subgraph form a spanning tree. This implies that, if even a
single connection goes down (for example, because someone
pulls a communication cable out of the back of a computer in
this domain), then this subgraph will no longer be connected.
## 13

Data Structures and Algorithms in Java
## 14
## 14
## Single
## Directed
graph
## Single
undirected
graph
## Weighted
graph
## Graph Examples - 4
An undirected graph
with multiple edges
An directed graph
with multiple edges
An undirected graph
with loops
It is also a simple
graph because it has
no mutiple edges and
no loops

Data Structures and Algorithms in Java
## 15
•Acomplete graphis a graph where every pair of vertices is
connected by an edge.
•Asimple complete graph onnverticeshasnvertices andn(n-1)/2
edges, and is denoted byKn
## 15
## Graph Terminology - 7
- AgraphG'=(V', E') is a subgraph of another graph G=(V, E) iff V

Data Structures and Algorithms in Java
## 16
## 16
Summary for Basic Notions on Graph
Vertex, edge, (directed, undirected edge),
(directed, undirected graph), adjacent vertices,
incident edge,degree, isolated vertex, parallel
edge or multiple edge, loop, simple graph,
multigraph, path, simple path, cycle, connected,
strongly connected, weakly connected,
subgraph, spanning subgraph, forest, tree,
spanning tree, complete graph, simple complete
graph, cut-vertex (articulation point), bridge(cut-
edge), block,...

Data Structures and Algorithms in Java
## 17
Graph applications
•Electronic circuits
•Transportation
networks
•Computer networks
•Database
– Entity-relationship diagram
## 17

Data Structures and Algorithms in Java
## 18
## Graph Representation – 1
## 18
Graph representations.
A graph (a)can berepresented as
(b–c) an adjacency list.
(Adjacency list)

Data Structures and Algorithms in Java
## 19
## 19
Graph represented by an adjacency matrix
## Graph Representation – 2
(Adjacency matrix)

Data Structures and Algorithms in Java
## 20
A vertex is said to beincidentto an edge if the edge is connected to the vertex.
Graph represented by incident matrix
## Graph Representation – 3
(Incident matrix)

Data Structures and Algorithms in Java
## 21
## Breadth-first Search
## 21
-  In thebreadth-first search algorithm, at first a
selected vertexvis visited and then each unvisited
vertex adjacent tovis visited. Suppose these
adjacents are v
## 1
, v
## 2
,... v
k
. After all these vertices are
visited, all adjacents of v
## 1
are visited, then all
adjacents of v
## 2
are visited and so on. If there are still
some unvisited vertices in the graph, the traversal
continues restarting for one of the unvisited vertices.
## Graph Traversals

Data Structures and Algorithms in Java
## 22
## 22
## Breadth-first Search Algorithm
Search a graph (directed or not) in breadth first, this is done by using
a queue where the vertices found are stored.
BFS(Graph G)
{ all vertices of G are first painted white
the graph root is painted gray and put in a queue
while the queue is not empty
{ a vertex u is removed from the queue
for all white successors v of u
{ v is painted gray
v is added to the queue
## }
u is painted black
## }
## }

Data Structures and Algorithms in Java
## 23
## 23
Breadth-first Search code
// bread first traverse from vertex k
void breadthFirst(int k)
{MyQueue q = new MyQueue();int i,h;
boolean [] enqueued = new boolean[n];
for(i=0;i<n;i++) enqueued[i]=false;
q.enqueue(new Integer(k));enqueued[k]=true;
while(!q.isEmpty())
{h=Integer.parseInt((q.dequeue()).toString().trim());
visit(h);
for(i=0;i<n;i++)
if((!enqueued[i]) && a[h][i]>0)
## {q.enqueue(new Integer(i));
enqueued[i] = true;
## }
## }
## System.out.println();
## }

Data Structures and Algorithms in Java
## 24
## Depth-first Traversal
•In thedepth-first search algorithm, at first selected
vertexvis visited and then each unvisited vertex
adjacent tovis visited by depth-first search. If there are
still some unvisited vertices in the graph, the traversal
continues restarting for one of the unvisited vertices.
An example of application of thedepthFirstSearch()algorithm to a graph

Data Structures and Algorithms in Java
## 25
Depth-First Search algorithm
DFS on a graph withnvertices and
medges takesO(n+m) time
The idea is the same, but we now
use a stack instead of a queue.
With recursion of course, so the
stack management is all done by
## Java.
Here is a brief description of the
DFS algorithm:
DFS-visit (Graph G, Vertex u)
{ the vertex u is painted gray
for all white successors v of u
{ dfs-visit(G, v)
## }
u is painted black
## }
DFS (Graph G)
{ all vertices of G are first painted white
DFS-visit(G, root of G)
## }

Data Structures and Algorithms in Java
## 26
Depth-First Traverse code
void visit(int i)
{System.out.print(" " + v[i]);
## }
void depthFirst(boolean visited[], int i)
{visit(i);visited[i] = true;
int j;
for(j=0;j<n;j++)
if(a[i][j]>0 && (!visited[j]))
depthFirst(visited,j);
## }
void depthFirst(int k)
{int i; boolean [] visited = new boolean[20];
for(i=0;i<n;i++) visited[i]=false;
depthFirst(visited,k);
for(i=0;i<n;i++)
if(!visited[i])
depthFirst(visited,i);
## System.out.println();
## }

Data Structures and Algorithms in Java
## 27
Shortest Path problem
## 27
•Theproblem:find the shortest path between a pair
of vertices of a graph
•Thegraph: may contain negative edges but no
negative cycles
•Arepresentation: a weighted matrix where
W(i,j) = 0 if i=j.
W(i,j) =¥if there is no edge between i and j.
W(i,j) = weight of the edge (i,j)

Data Structures and Algorithms in Java
## 28
## Dijkstra's Algorithm - 1
## 28
The main idea in applying the greedy-method pattern to the
single-source shortestpath problem is to perform a “weighted”
breadth-first search starting at the source vertexs. In particular,
we can use the greedy method to develop an algorithm that
iteratively grows a “cloud” of vertices out ofs, with the vertices
entering the cloud in order of their distances froms. Thus, in
each iteration, the next vertex chosen is the vertex outside the
cloud that is closest tos. The algorithm terminates when no
more vertices are outside the cloud (or when those outside the
cloud are not connected to those within the cloud), at which point
we have a shortest path fromsto every vertex ofGthat is
reachable froms. This approach is a simple, but nevertheless
powerful, example of the greedy-method design pattern.
Applying the greedy method to the single-source, shortest-path
problem, results in an algorithm known asDijkstra’salgorithm.

Data Structures and Algorithms in Java
## 29
## Dijkstra's Algorithm - 2
## 29
DijkstraAlgorithm(non-gegative weighted simple
digraph, vertex first)
forallvertices v#firstcurrDist(v)=
## ;
currDist(first) = 0;
toBeChecked = V (all vertices);
checked=empty;
while toBeChecked is not empty
u = a vertex in toBeChecked with min.currDist(u);
remove u from toBeChecked and add to checked;
for all vertices v adjacent to u and in toBeChecked
if (currDist(v) > currDist(u) + weight(edge(uv)))
{currDist(v) = currDist(u) + weight(edge(uv))
predeccessor(v) = u;
## }

Data Structures and Algorithms in Java
## 30
Dijkstra's Algorithm example - 1
## 30
Dijkstra’s algorithm keepstwosets of vertices:
SVertices whose shortest paths have
already been determined
V-SRemainder
## Also
dBest estimates of shortest path to each
vertex
pPredecessors for each vertex
int [][] b = {
## {  0,   7,   9, 99, 99, 14},
## {  7,   0, 10, 15, 99, 99},
## {  9, 10,   0, 11, 99,   2},
## {99, 15, 11,   0,   6, 99},
## {99, 99, 99,   6,   0,   9},
## {14, 99,   2, 99,   9,   0}
## };
## A(1), B(2), C(3), D(4), E(5), F(6)

Data Structures and Algorithms in Java
## 31
The complexity of Dijkstra's
algorithm is O(|V|
## 2
## ). This
algorithm is not general
enough in that it may fail
when negative weights are
used in graphs.
Dijkstra's Algorithm example - 2

Data Structures and Algorithms in Java
## 32
## Floyd Algorithm
## 32
All pairs shortest path
•Theproblem:find the shortest path between every pair of
vertices of a graph
•Thegraph: may contain negative edges but no negative cycles
1.D =W// initializeDarray toW[ ]
2.P=0  // initialize P array to [0]
3.fork=1 ton
-   do fori=1 ton
5.do forj=1 ton
6.if (D[i,j] >D[i,k] +D[k,j] )
7.then {D[i,j] =D[i,k] +D[k,j]
8.P[i,j] = P[k,j];
## }
Complexity O(|V|
## 3
## )

Data Structures and Algorithms in Java
## 33
Floyd Algorithm example

Data Structures and Algorithms in Java
## 34
ThevaluesinparenthesisarethenonzeroPvalues.
The final distance matrix and P
Floyd Algorithm example (cont.)

Data Structures and Algorithms in Java
## 35
## Summary
## 35
## • Graph Introduction
- Graph definition
## • Graph Terminology
- Graph applications
## • Graph Representation
## • Graph Traversals
## • Shortest Paths
– Dijsktra algorithm
– Floyd algorithm

Data Structures and Algorithms in Java
## 36
Reading at home
Text book: Data Structures and Algorithms in Java
## 14 Graph Algorithms 611
## 14.1 Graphs  - 612
14.1.1 The Graph ADT  - 618
14.2 Data Structures for Graphs - 619
## 14.2.1 Edge List Structure  - 620
## 14.2.2 Adjacency List Structure - 622
## 14.2.4 Adjacency Matrix Structure - 625
## 14.3 Graph Traversals  -  630
14.3.1 Depth-First Search  - 631
14.3.3 Breadth-First Search  - 640
## 14.6 Shortest Paths  - 651
## 14.6.1 Weighted Graphs  - 651
## 14.6.2 Dijkstra’s Algorithm  - 653