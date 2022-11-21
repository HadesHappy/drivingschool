const isFill = props => {
  let string = {
    isFull: false,
    details: ''
  }

  if (!props.title) {
    string.details += 'title, '
  }
  if (!props.image) {
    string.details += 'image, '
  }
  if (!props.category) {
    string.details += 'tema, '
  }
  if (!props.killertest && !props.gemela && !props.newpregunta) {
    string.details += 'tag tab, '
  }
  if (!props.choice1) {
    string.details += 'choice1 '
  }
   if (!props.choice2) {
    string.details += 'choice2 '
  }
  if (!props.choice3) {
    string.details += 'choice3 '
  }
  if(!props.answer) {
    string.answer += 'answer '
  }
  if (string.details === '') {
    string.isFull = true
  } else {
    string.isFull = false
  }

  return string
}

export default isFill