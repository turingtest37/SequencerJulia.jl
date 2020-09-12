var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"CurrentModule = SequencerJ","category":"page"},{"location":"api/#Types","page":"API","title":"Types","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"SequencerResult","category":"page"},{"location":"api/#SequencerJ.SequencerResult","page":"API","title":"SequencerJ.SequencerResult","text":"SequencerResult\n    EOSeg::Dict{Tuple,Any} # list of elongation and orderings (BFS,DFS), one per Segment    \n    EOAlgScale::Dict{Tuple,Any} # elongation and orderings for the cumulated weighted distances\n    D::AbstractMatrix # final distance matrix\n    mst::LightGraphs.AbstractGraph # final mst\n    η::Real # final elongation\n    order::AbstractVector #final ordering from bfs\n\nType containing the results of a Sequencer run.\n\n\n\n\n\n","category":"type"},{"location":"api/","page":"API","title":"API","text":"Call accessor functions using the SequencerResult object. For example, to get the final column ordering of the data, call order :","category":"page"},{"location":"api/","page":"API","title":"API","text":"using SequencerJ #hide\nA = rand(100,100);\nr = sequence(A;);\norder(r)","category":"page"},{"location":"api/#Functions","page":"API","title":"Functions","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"\nsequence\nelong\norder\nmst\nD\nη\n\nEMD()\nEMD(u::AbstractVector{T}, v::AbstractVector{T}) where {T <: Real}\nEMD(u,v,uw,vw)\nemd\n\nEnergy()\nEnergy(::AbstractVector{T}, ::AbstractVector{T}) where {T <: Real}\nEnergy(u,v,uw,vw)\nenergy\n\nelongation\nensuregrid!\nunroll\nprettyp","category":"page"},{"location":"api/#SequencerJ.sequence","page":"API","title":"SequencerJ.sequence","text":"sequence(A::VecOrMat{T}; \n    scales=nothing,\n    metrics=ALL_METRICS,\n    grid=nothing,\n    ) where {T <: Real}\n\nAnalyze the provided m x n matrix (or m vectors of vectors n) by applying one or more 1-dimensional statistical metrics to  each column of data, possibly after dividing the data into smaller row sets. Columns are compared pairwise for each combination  of metric and scale to create a n x n distance matrix that is analyzed as a graph using a novel algorithm. Details of the algorithm are provided in the paper cited below, by D. Baron and B. Ménard.\n\nsequence(A, metrics=ALL_METRICS, scales=nothing)\n\nor equivalently:\n\nsequence(A)\n\nas metrics=ALL_METRICS and scales=nothing are defaults. If you want to specify only one metric, you must wrap it in a 1-tuple. e.g. to use only KL Divergence, write:\n\nsequence(A, metrics=(KLD,), scales=nothing\n\nUse the scales keyword to specify the number of \"chunks\" into which the data should be divided, as a tuple, e.g. \n\nsequence(A, scales=(1,3,5))\n\nIn the autoscale mode (enabled by default as scales=nothing) SequencerJ will find its own \"best scale\" based on  running the Sequencer against a sample of columns (10% for now) and picking the scale that results in the greatest elongation.\n\nA 1-D grid may be provided. The grid - whose deltas figure in the distance calculations - must be non-negative  real numbers (Float16, Float32, or Float64). The grid length must equal the number of rows in A.\n\njulia> sequence(A; metrics=(WASS1D,L2), grid=collect(0.5:0.5:size(A,1))) # grid must equal the size of A along dim 1\n\nThe paper that describes the Sequencer algorithm and its applications can be found  on Arxiv.\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.elong","page":"API","title":"SequencerJ.elong","text":"elong(r::SequencerResult)\n\nReturn the elongation coefficient of the final, weighted graph.\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.order","page":"API","title":"SequencerJ.order","text":"order(r::SequencerResult)\n\nReturn the result column indices, as determined by the Sequencer algorithm.\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.mst","page":"API","title":"SequencerJ.mst","text":"mst(r::SequencerResult)\n\nReturn the final minimum spanning tree graph from a Sequencer run. \n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.D","page":"API","title":"SequencerJ.D","text":"D(r::SequencerResult)\n\nReturn the final distance matrix from the Sequencer run.\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.η","page":"API","title":"SequencerJ.η","text":"η(r::SequencerResult)\n\nAlias for elong. The final graph elongation of a Sequencer run.\n\nPro tip: write η using `followed by TABeta` at the Julia repl.\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.EMD-Tuple{}","page":"API","title":"SequencerJ.EMD","text":"EMD distance with with no grid provided. Grids default to axes(u,1) and axes(v,1).\n\n\n\n\n\n","category":"method"},{"location":"api/#SequencerJ.EMD-Union{Tuple{T}, Tuple{AbstractArray{T,1},AbstractArray{T,1}}} where T<:Real","page":"API","title":"SequencerJ.EMD","text":"EMD(u::AbstractVector{T}, v::AbstractVector{T}) where {T <: Real}\n\nCalculate the Earth Mover Distance (EMD) a.k.a the 1-Wasserstein distance between the two given vectors, accepting a default grid. u and v are treated as  weights on the grid. The default grid is equal to the first axis of u and v.\n\nu = rand(10);\nu .= u / sum(u);\nsum(u)\n\nEMD implements the Distances package convention of runnable types:\n\nv = rand(10);\nv .= v / sum(v);\nd = EMD()(u,v)\n\n\n\n\n\n","category":"method"},{"location":"api/#SequencerJ.EMD-NTuple{4,Any}","page":"API","title":"SequencerJ.EMD","text":"EMD(u,v,uw,vw)\n\nCalculate the Earth Mover's Distance using an explicit grid. This method is not intended to be called directly. Instead, specify a grid in the call to sequence, with the WASS1D constant.\n\n\njulia> A = rand(50, 100)\n50×100 Array{Float64,2}:\n[...]\njulia> g = collect(0.5:0.5:div(size(A,1),2))\n50-element Array{Float64,1}:\n   0.5\n   1.0\n   1.5\n  [...]\n  24.0\n  24.5\n  25.0\njulia> sequence(A; grid = g)\n┌ Info: Sequencing data with\n│     shape: (50, 100)\n│     metric(s): (SqEuclidean(0.0), EMD(nothing), KLDivergence(), Energy(nothing))\n└     scale(s): (1, 2, 4)\n[ Info: `SqEuclidean(0.0) at scale 1: η = 5.214 (3.4s)\n[...]\n\n\n\n\n\n","category":"method"},{"location":"api/#SequencerJ.emd","page":"API","title":"SequencerJ.emd","text":"Convenience method for EMD(u,v).\n\nSee EMD(u,v)\n\n\n\n\n\nConvenience method for EMD(u,v,uw,vw).\n\nSee EMD(u,v,uw,vw)\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.Energy-Tuple{}","page":"API","title":"SequencerJ.Energy","text":"Default constructor with no specified grid.\n\n\n\n\n\n","category":"method"},{"location":"api/#SequencerJ.Energy-Union{Tuple{T}, Tuple{AbstractArray{T,1},AbstractArray{T,1}}} where T<:Real","page":"API","title":"SequencerJ.Energy","text":"Energy(u,v)\n\nCalculate Székely's energy distance between the two given vectors, accepting a default grid. u and v are treated as weights on the grid. The default grid is equal to the first axis of u and v.\n\n\n\n\n\n","category":"method"},{"location":"api/#SequencerJ.Energy-NTuple{4,Any}","page":"API","title":"SequencerJ.Energy","text":"Energy(u,v,uw,vw)\n\nCalculate Székely's energy distance between the two given vectors, u and v,  whose weights uw, vw are treated as a empirical cumulative distribution function (CDF). u and v must have the same length, respectively, as uw and vw. \n\n\n\n\n\n","category":"method"},{"location":"api/#SequencerJ.energy","page":"API","title":"SequencerJ.energy","text":"Convenience function for Energy with a supplied grid.\n\n\n\n\n\nConvenience function for Energy with a default unit grid.\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.elongation","page":"API","title":"SequencerJ.elongation","text":"julia\n\nelongation(g, startidx)\n\nReturns the ratio of the graph g's half-length (mean of path distances) over the  half-width, defined as the mean count of shortest paths from the center node of a minimum spanning tree over the graph. This function calls the dijkstra_shortest_paths  function in LightGraphs.\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.ensuregrid!","page":"API","title":"SequencerJ.ensuregrid!","text":"Ensure that the size of the 1-D grid, if provided, is compatible with the data in A. Create a grid if one was not provided.\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.unroll","page":"API","title":"SequencerJ.unroll","text":"Walk the given graph, starting from the given vertex, returning the list of all outbound vertices that are visited.\n\n\n\n\n\n","category":"function"},{"location":"api/#SequencerJ.prettyp","page":"API","title":"SequencerJ.prettyp","text":"Print the sequence of outbound nodes of a graph starting from the given index. pystyle implies reversing the final order and substracting 1 from the vertex number.\n\n\n\n\n\nReturn the first and last len elements of the vector as a string.\n\nDefault is to print 3 elements at head and tail.\n\njulia> v = collect(1:10);\njulia> prettyp(v)\n\n\"1,2,3...8,9,10\"\n\nExample w/5 elements visible\n\njulia> v = collect(1:10);\njulia> prettyp(v, 5)\n\n\"1,2,3,4,5...6,7,8,9,10\"\n\n\n\n\n\n","category":"function"},{"location":"api/#Metrics","page":"API","title":"Metrics","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"[`KLD`](@ref)\n[`L2`](@ref)\n[`ENERGY`](@ref)\n[`WASS1D`](@ref)\n[`ALL_METRICS`](@ref)","category":"page"},{"location":"api/","page":"API","title":"API","text":"See [`SqEuclidean()`](@ref)\nSee [`KLDivergence()`](@ref)","category":"page"},{"location":"examples/#Examples-of-SequencerJ","page":"Examples","title":"Examples of SequencerJ","text":"","category":"section"},{"location":"examples/#Data-in-Portrait-Mode","page":"Examples","title":"Data in Portrait Mode","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"SequencerJ works best with data going down the columns.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"\nusing SequencerJ\nusing Random\nusing Images\n\nimg = Gray.(load(joinpath(@__DIR__, \"..\",\"..\",\"resources\",\"bread.jpeg\")))\nA = convert(Matrix{Float32}, img)\nM,N = size(A)\nA = M < N ? permutedims(A) : A\nshuff_idx = shuffle(axes(A,2))\nAs = A[:, shuff_idx]\nseqres = sequence(As, metrics=(KLD, L2)); #autoscale\ncolorview(Gray, permutedims(As[:, order(seqres)])) # re-permute the matrix to get back landscape\n","category":"page"},{"location":"#SequencerJ.jl","page":"ABCs of SequencerJ","title":"SequencerJ.jl","text":"","category":"section"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"CurrentModule = SequencerJ","category":"page"},{"location":"#Installation","page":"ABCs of SequencerJ","title":"Installation","text":"","category":"section"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"SequencerJ is not yet a registered package, but installing it requires mere whispers of additional keystroke beyond those for a regular package:","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\n`]` add \"https://github.com/turingtest37/SequencerJ.jl/\"\n","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"The ] key switches the REPL into package manager mode. The add command accepts a URL. The  delete key gets you back to the REPL.","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Alternatively you can stay in the REPL:","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"using Pkg; Pkg.add(PackageSpec(url=\"https://github.com/turingtest37/SequencerJ.jl/\"));","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"You may get WARNINGs upon compilation. You can safely ignore them for most purposes, but if you are developing SequencerJ locally and use the Revise package, note that you may have to restart your Julia environment more often than usual.","category":"page"},{"location":"#Using-SequencerJ","page":"ABCs of SequencerJ","title":"Using SequencerJ","text":"","category":"section"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Getting started with SequencerJ is straightforward. First, we need to wrangle some data to analyze. For a quick (but unpromising) start, let's use a random array.","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"using SequencerJ\n\nA = rand(100,50);\nr = sequence(A);","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"The sequence method is the primary interface to SequencerJ. Only the input matrix or vector A is required. All other options use their defaults: scales=nothing enables autoscaling to find the best row segmentation; metrics=ALL_METRICS enables all supported measurement; grid=nothing forces automatic grid creation. See sequence","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Data and statistics from a sequencing run are encapsulated in a SequencerResult.","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"r","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Use SequencerJ's accessor functions to get the details of a run. The result data sequence (1-based column indices, not 0-based row indices as in Sequencer for python) can be obtained with the order function.","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\norder(r)\n","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"A key feature of the Sequencer algorithm is the calculated elongation of the minimum spanning tree that describes the best fit sequence. See elong","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"elong(r)","category":"page"},{"location":"#A-Better-Example","page":"ABCs of SequencerJ","title":"A Better Example","text":"","category":"section"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Random data looks pretty boring from every direction, so let's apply the Sequencer to something more enjoyable: trying to put back together an image whose columns (of pixels) have been shuffled. This trick will even impress your mom!","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"The resources folder contains test images you can use to play with SequencerJ.","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"using SequencerJ\nusing Random\nusing Images\n\nimg = load(joinpath(@__DIR__, \"..\", \"..\",\"resources\",\"bread.jpeg\"))","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Color is nice but grayscale is easier.","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"imgg = (Gray.(img))","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Let's slice up this loaf of bread with a different kind of knife...","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"A = convert(Matrix{Float32}, imgg);\nshuff_idx = shuffle(axes(A,2));\nprettyp(shuff_idx, 3)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Reordering the image with a shuffled column index creates a lot of bread crumbs!","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"As = A[:, shuff_idx]\ncolorview(Gray, As)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Now let's put back together the pieces. We run SequencerJ against the shuffled matrix, and gather the best sequence as a column index.","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"seqres = sequence(As, metrics=(KLD, L2))\nbestguessidx = SequencerJ.order(seqres)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Drum roll, please!","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"colorview(Gray, As[:, bestguessidx])","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Oops, the image is mirrored. That's easy to fix:","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"colorview(Gray, As[:, reverse(bestguessidx)])","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"Voilà!","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"warning: Failure is an option\nThe Sequencer sometimes fails to reassemble images completely. Usually this is because an image is too small along the row dimension and therefore does not contain enough data to allow the algorithm to discriminate correctly between similar columns of data. To ensure best performance, images should be presented in \"portrait\" mode, with more rows than columns.","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"See a full example of portrait mode here Data in Portrait Mode","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\n## Metrics\n\nTo make sense of A, we must choose which statistical distance metrics to apply. Each metric compares A pairwise, column by column, to create a distance matrix. The matrix is analyzed using graph theory to identify an *optimal* ordering of columns in A.\n\nThis optimal sequence represents the least-cost path through the distance matrix and hence the closest affinities between columns, as proximity is the inverse of distance. See [The Sequencer Algorithm](@ref)\n\nSequencerJ currently supports four metrics:\n\n  * L2 - [`SqEuclidian`](@ref)\n  * Earth Mover's Distance - [`EMD`](@ref)\n  * Kullback-Lubler divergence - [`KLDivergence`](@ref)\n  * Szekely's energy distance - [`Energy`](@ref)\n\n\nWith no other arguments, `sequence` applies all algorithms it knows to the data (`metrics = ALL_METRICS`). Distance algorithms may be specified individually or in groups with the `metrics` keyword.\n","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"julia r = sequence(A, scales=(1,3), metrics=(L2,ENERGY))","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nTo specify a single metric, write it as a 1-tuple:\n","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"julia r = sequence(A, scales=(1,3), metrics=(L2,))","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\n## Scales\n\nThe default `scale` is chosen by an \"autoscaling\" algorithm that samples the columns, runs the Sequencer on this subset at several scales (currently, the Fibonacci sequence), and compares them. The scale producing the greatest elongation is chosen to run on the full data set. You may force autoscaling with (`scales=nothing`).\n","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"julia sequence(A, scales=nothing)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nScale means the number of parts into which the data is partitioned. Each section or *chunk* contains approximately `size(A,1)/scale` elements. For example, 100 rows at scale 3 will result in chunks of 33, 33, and 34 rows. Set scales manually using the `scales` keyword:\n","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"julia r = sequence(A, scales=(1,3))","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nTo choose only one scale, write it as a 1-tuple:\n","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"julia r = sequence(A, scales=(4,))","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\n## Output\n\nUse accessor functions to get details from the `SequencerResult`.\n","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"@repl accessors using SequencerJ #hide A = rand(2000, 100); r = sequence(A);","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nBest column sequence: [`order`](@ref)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"@repl accessors order(r)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nFinal elongation: [`elong`](@ref)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"@repl accessors elong(r)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nFinal elongation: [`mst`](@ref)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"@repl accessors mst(r)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nFinal distance matrix: [`D`](@ref)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"@repl accessors D(r)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nPer-segment intermediate results:","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"@repl accessors using Base.Iterators segDict = r.EOSeg; for (k,l) in Iterators.take(keys(segDict), 3)     η, mst = segDict[(k,l)] end segDict[KLD] η, mst = segDict[(KLD,2)] η = first(segDict[(KLD,2)])","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nCollect the mean elongations across segments for each metric+scale","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"@repl accessors collect(StatsBase.mean(first(v)) for (k,v) in r)","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"\nIn a similar fashion, get final elongations and the MST for each metric+scale:","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"@repl accessors rk = r.EOAlgScale ```","category":"page"},{"location":"#The-Sequencer-Algorithm","page":"ABCs of SequencerJ","title":"The Sequencer Algorithm","text":"","category":"section"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"The algorithm is described in detail in the paper available on Arxiv","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"@misc{baron2020extracting,\ntitle={Extracting the main trend in a dataset: the Sequencer algorithm},\nauthor={Dalya Baron and Brice Ménard},\nyear={2020},\neprint={2006.13948},\narchivePrefix={arXiv},\nprimaryClass={cs.LG},\nyear=2020","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"}","category":"page"},{"location":"","page":"ABCs of SequencerJ","title":"ABCs of SequencerJ","text":"As another example of how the Sequencer algorithm may be used, see Mapping Earth's deepest secrets.","category":"page"},{"location":"algorithms/#Metrics","page":"Metrics","title":"Metrics","text":"","category":"section"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"CurrentModule = SequencerJ","category":"page"},{"location":"algorithms/#Types","page":"Metrics","title":"Types","text":"","category":"section"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"SequencerJ currently supports the four algorithms originally cited in the article and supported by the python version of the Sequencer. These are:","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"SqEuclidean\nKLDivergence\nEMD\nEnergy","category":"page"},{"location":"algorithms/#Distances.SqEuclidean","page":"Metrics","title":"Distances.SqEuclidean","text":"SqEuclidean([thresh])\n\nCreate a squared-euclidean semi-metric. For the meaning of thresh, see Euclidean.\n\n\n\n\n\n","category":"type"},{"location":"algorithms/#SequencerJ.EMD","page":"Metrics","title":"SequencerJ.EMD","text":"EMD\n\nEarth Mover's Distance, a.k.a. 1-p Monge-Wasserstein distance. The algorithm as  implemented here assumes balanced transport where both vectors have the same statistical mass (they both sum to 1). Input vectors should be normalized to sum to 1.\n\n\n\n\n\n","category":"type"},{"location":"algorithms/#SequencerJ.Energy","page":"Metrics","title":"SequencerJ.Energy","text":"Energy\n\nEnergy distance as defined by Székely. An explicit grid may be provided. Default is  axes(u,1) and axes(v,1).\n\nEnergy distance\n\n\n\n\n\n","category":"type"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"Each algorithm has associated to it a constant that represents a usable default type instance (with a default grid):","category":"page"},{"location":"algorithms/#Constants","page":"Metrics","title":"Constants","text":"","category":"section"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"L2\nKLD\nWASS1D\nENERGY\nALL_METRICS","category":"page"},{"location":"algorithms/#SequencerJ.L2","page":"Metrics","title":"SequencerJ.L2","text":"Constant to use when specifying the Square Euclidean or L2 distance metric for a sequencing run.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#SequencerJ.KLD","page":"Metrics","title":"SequencerJ.KLD","text":"Constant for specifiying the Kullbach-Leibler Divergence metric.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#SequencerJ.WASS1D","page":"Metrics","title":"SequencerJ.WASS1D","text":"Constant for specifiying the Monge-Wasserstein a.k.a. 1-p Wasserstein a.k.a. Earth Mover's Distance (EMD) metric. This metric is sensitive to the underlying grid. Default is unit grid taken from the axes of the data vector.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#SequencerJ.ENERGY","page":"Metrics","title":"SequencerJ.ENERGY","text":"Constant for specifiying the Energy distance as defined by Székely. Wikipedia article\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#SequencerJ.ALL_METRICS","page":"Metrics","title":"SequencerJ.ALL_METRICS","text":"Convenience constant to represent all of L2, WASS1D, KLD, and ENERGY.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Usage","page":"Metrics","title":"Usage","text":"","category":"section"},{"location":"algorithms/#Data-Orientation","page":"Metrics","title":"Data Orientation","text":"","category":"section"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"SequencerJ operates on pairwise columns of data in the given matrix (or vector of vectors). It  builds an N x N distance matrix for further analysis, given an N-column input. It is therefore important to properly orient the data matrix so that M observations run downward along N columns, with each column representing a separate data set or series.","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"This can be performed efficiently with permutedims:","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"A = rand(10,5)\nM,N = size(A)\nA = M < N ? permutedims(A) : A","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"While a 2-D data set such as a photograph may be shuffled and reassembled in either orientation, the Sequencer algorithm will work better with more rows and fewer columns (i.e. M > N).","category":"page"},{"location":"algorithms/#Autoscaling","page":"Metrics","title":"Autoscaling","text":"","category":"section"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"The Sequencer algorithm's processing time rises as N x N, posing a challenge for data exploration with larger data sets. It may require considerable experimentation with multiple scales and metrics before finding an optimum combination. To assist with finding an appropriate scale, SequencerJ offers an \"autoscaling\" option. This is, in fact, the default behavior with the keyword argument scales=nothing.","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"In autoscaling, SequencerJ first performs the sequencing function at several scales on a subset of columns. The scale producing the greatest elongation (see elong) is then used on the full dataset. This is a feature specific to the Julia port of the Sequencer algorithm.","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"At present, there is no \"autometric\" option to choose the best metric.","category":"page"},{"location":"algorithms/#Metrics-and-Grids","page":"Metrics","title":"Metrics and Grids","text":"","category":"section"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"Setting the metrics keyword option as","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"sequence(A, metrics=(L2, ENERGY))","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"means to use Distances.SqEuclidean() and SequencerJ.Energy().","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"With equal effect, you can write:","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"sequence(A, metrics=(SqEuclidean(), Energy())","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"You can specify a threshold for the SqEuclidean calculations. To use, e.g., 1e-7 means round to zero any distance calculation results smaller than 1e-7.","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"sequence(A, metrics=(SqEuclidean(1e-7), Energy())","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"To specify a non-unit data grid, set grid as a Vector{AbstractFloat} in the range [0.0-1.0) and use the Distance type, not the constant.","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"using SequencerJ #hide\nA = rand(100,100);\nM,N = size(A)\ng = collect(0.0:0.5:N-1)\nsequence(A, metrics=(Energy()), grid=g)","category":"page"},{"location":"algorithms/","page":"Metrics","title":"Metrics","text":"To these four metrics, the intention is to add spectral methods for complex (i.e. 2-D) inputs and any other Distances that make sense for sequencing 1-D or 2-D data. I would love community help with this!","category":"page"}]
}
