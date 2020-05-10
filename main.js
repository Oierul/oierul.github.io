const factors = {
    min: {
        mult: '0.3625',
        exp: '2.6425',
    },
    max: {
        mult: '0.3424',
        exp: '2.7315',
    },
};

function factorize(l, mult, exp) {
    return (
        new BigDecimal(mult)
            .multiply(new BigDecimal(
                Math.pow(
                    l,
                    exp
                )
            ))
    ).toString();
}

function computeFactors(length) {
    let l = parseFloat(length);
    let min = factorize(l, factors.min.mult, factors.min.exp);
    let max = factorize(l, factors.max.mult, factors.max.exp);

    console.log('called compute factors', {l, min, max});
    
    return { min, max };
}

function testos(length, weight) {
    let { min, max } = computeFactors(length);

    let w = parseFloat(weight);

    return w >= parseFloat(min) && w <= parseFloat(max);
}
