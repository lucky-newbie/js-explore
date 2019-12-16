
export const A = () => {
  return {
    type: 'A'
  }
}

export const B = () => {
  return {
    type: 'B'
  }
}

const moduleA = (state = 0, action) => {
  switch (action.type) {
    case 'A':
      return state + 1;
      break;
    case 'B':
    console.log('b?')
      return state - 1;
    default:
      return state;
  }
}

export default moduleA;