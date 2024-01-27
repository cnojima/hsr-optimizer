import React from 'react';
import { Flex } from 'antd';
import ColorizeNumbers from 'components/common/ColorizeNumbers';


const FullPassives = (content: { [key:string]: { [key: string]: string}}) => {
  if (content) {
    const ret = Object.keys(content).map((key) => {
      const render = []
      if (content[key].title) {
        render.push(<b>{ColorizeNumbers(content[key].title)}</b>);
      }
      if (content[key].text) {
        // render.length > 0 && render.push(<br/>);
        render.push(<i>{ColorizeNumbers(content[key].text)}</i>);
      }
      if (content[key].content) {
        render.push(<p>{ColorizeNumbers(content[key].content)}</p>);
      }
      
      return render;
    });
    
    return (<Flex vertical gap={10}>{ret}</Flex>);
  }

  return null;
};

export default FullPassives