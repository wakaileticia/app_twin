import sensors from '../../mock/sensors.json';

export const fetchSensors = async () => {
    return sensors;
};

export const fetchSensorById = async (id: string) => {
    return sensors.find(sensor => sensor.id === id);
};
