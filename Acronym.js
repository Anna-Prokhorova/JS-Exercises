export const parse = (line) => {
    return line.replace(/[^a-zA-Z ']/g,' ').replace(/\s{2,}/g,' ').split(' ')
      .map(w => w[0].toUpperCase()).join('').replace(/[^A-Z]/g,'')
  };