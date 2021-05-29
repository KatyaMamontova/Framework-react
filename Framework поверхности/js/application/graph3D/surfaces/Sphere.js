Surfaces.prototype.sphere = (size = 10, steps = 10) => {
    const sur = new Surfaces();
    return sur.ellipse(size, 1, 1, 1, steps);
}