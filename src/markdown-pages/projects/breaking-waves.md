---
path: "/projects/breaking-waves"
title: "Honours Project (Breaking Waves)"
date: "2016-05"
---

# Honours Project
## Breaking Waves in Shoreline Water at Real-Time

For my honours project I looked into how breaking waves could be incorporated into shoreline water simulations
at real-time for use in games. The dissertation can be found at the bottom of the page

<iframe width="800" height="600" src="https://www.youtube.com/embed/zfIzm-CJ3UQ" frameborder="0" allowfullscreen></iframe>

The simulation uses the 1D shallow-water equations to model the flow of water across a sloping sea bed.
Waves are propagated into the simulation, naturally steepening as they approach the shoreline where the depth of the water
reduces to zero. By using the shallow-water equations water is able to flow up onto the beach, causing the shoreline
to advance and recede.

<img alt="Shallow-Water Equations" width=60% src="/breaking-waves/0.png">

When a wave becomes steep enough that it would break, a wave mesh is created at the peak of the wave by spawning
particles forward from its peak. These meshes can only extend so far until the wave is closer to the shoreline.

<img alt="generating Wave Meshes 1" width=60% src="/breaking-waves/1.png">

Once close enough to the shoreline the wave is allowed to fully break. As the wave mesh collides
with the surface of the water is raised to blend with the wave mesh. The wave mesh is then removed.

<img alt="Generating Wave Meshes 2" width=60% src="/breaking-waves/2.png">
    
Particle effects are used to make the breaking waves visually more appealing. foam has also been added
along the length of the shoreline to make it more believable. As water flows over the sand it becomes wet,
slowly drying over time.

<img alt="Particle Effects" width=60% src="/breaking-waves/3.png">

Animated ripples combined with normal mapping distorts the surface of the water, creating very nice reflections
of the sky above.

<img alt="Surface Detail and Reflections" width=60% src="/breaking-waves/4.png">

A day-night cycle compliments the simulation, helping to show off the surface of the water and make it
visually exciting.

<img alt="Day-Night Cycle" width=60% src="/breaking-waves/5.png">

<embed width="900" height="900" src="/breaking-waves/dissertation.pdf">