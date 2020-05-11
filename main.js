const factors = {
    min: {
        mult: '0.3625',
        exp: '2.6425',
    },
    max: {
        mult: '0.3354',
        exp: '2.7976',
    },
    avg: {
        mult: '0.3424',
        exp: '2.7315',
    }
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
    let avg = factorize(l, factors.avg.mult, factors.avg.exp);
    // console.log('called compute factors', {l, min, max, avg});

    return { min, max, avg };
}

function testos(length, weight) {
    let { min, max, avg } = computeFactors(length);

    let w = parseFloat(weight);

    if (w < parseFloat(min)) {
        return 0;
    }

    if (w <= parseFloat(avg)) {
        return 1;
    }

    if (w <= parseFloat(max)) {
        return 2;
    }

    return 3;
}
