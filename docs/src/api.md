# API

```@meta
CurrentModule = SequencerJulia
```

## Module
```@docs
SequencerJulia
```

## Types
```@docs
SequencerResult
EMD
Energy
Distances.L2
Distances.KLDivergence
```

## External functions
```@docs
sequence
D
mst
elong
order
EMD
Energy
emd
energy
cdf_distance
elongation
leastcentralpt
loss
unroll
prettyp
SequencerJulia.show
bfs_parents
```

## Constants
```@docs
ϵ
L2
KLD
WASS1D
ENERGY
ALL_METRICS
```

## Internals
```@docs
SequencerJulia._ensuregrid!
SequencerJulia._splitnorm
SequencerJulia._mst
SequencerJulia._halflen
SequencerJulia._halfwidth
SequencerJulia._weighted_p_matrix
SequencerJulia._measure_dm
SequencerJulia.outneighbors_ranked
```