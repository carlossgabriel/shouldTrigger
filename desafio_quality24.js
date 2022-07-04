const _ = require("lodash")

const definition = {
  colorCode: 'red',
  trigger: {
    type: 'vital_sign',
    rules: [
      {
        target: 'heartrate',
        statements: [
          { key: 'heartrate.value', gt: 120, lt: 150 },
          { key: 'heartrate.unit', eq: 'bpm' },
        ],
      },
      {
        target: 'bloodPressure.systolic',
        statements: [
          { key: 'bloodPressure.systolic.value', gte: 158 },
          { key: 'bloodPressure.systolic.unit', eq: 'mmHg' },
        ],
      },
    ],
  },
};

const value = {
  bloodPressure: {
    systolic: {
      value: 178,
      unit: 'mmHg',
    },
    diastolic: {
      value: 76,
      unit: 'mmHg',
    },
  },
  heartrate: {
    value: 130,
    unit: 'bpm',
  },
};

const shouldTrigger = (definition, value) => {
  let trigger = {
    bloodPressure: false,
    heartrate: false
  }

  definition.trigger.rules.map(rule => {
    const result = _.get(value, rule.statements[0].key)
    if (rule.target === 'heartrate') {
      result > rule.statements[0].gt && result < rule.statements[0].lt ?
        trigger.heartrate = true :
        trigger.heartrate = false
    }

    if (rule.target === 'bloodPressure.systolic') {
      result >= rule.statements[0].gte ?
        trigger.bloodPressure = true :
        trigger.bloodPressure = false
    }
  })

  if (trigger.bloodPressure || trigger.heartrate) {
    return true
  }

  return false
}

shouldTrigger(definition, value)