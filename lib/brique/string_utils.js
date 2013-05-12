function primitive(string) {
  if (toString.call(string) !== '[object String]') return string;

  var value;
  try {
    value = JSON.parse(string);
  } catch(e) {
    value = string;
  }

  return value;
}

export primitive;
