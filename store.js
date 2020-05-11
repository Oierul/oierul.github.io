const turtleData = {
    measurements: {},
};

const turtleStore = {
    add: data => {
        const uuid = create_UUID();
        data.uuid = uuid;

        turtleData.measurements[uuid] = data;
        turtleStore.syncToLocalStorage();

        const indexKey = Object.keys(turtleData.measurements).length - 1;
        const item = turtleData.measurements[uuid];

        return { item, indexKey };
    },

    remove: uuid => {
        delete turtleData.measurements[uuid];
        turtleStore.syncToLocalStorage();
    },

    clear: () => {
        turtleData.measurements = {};
        turtleStore.syncToLocalStorage();
    },

    syncToLocalStorage: () => {
        localStorage.setItem('measurements_data', JSON.stringify(turtleData.measurements));
    },

    syncFromLocalStorage: () => {
        let currentData = localStorage.getItem('measurements_data');
        if (!currentData) {
            return;
        }

        try {
            turtleData.measurements = JSON.parse(currentData);
        } catch (e) {
            console.log('[Store error]', e);
        }
    },

    measurements: () => {
        return turtleData.measurements;
    }
};

function create_UUID(){
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });

    return uuid;
}
