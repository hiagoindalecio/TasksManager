import { Component, CSSProperties } from 'react';

type AlertProps = {
  text: string,
  bgColor?: string,
  hide?: boolean,
}

const css: CSSProperties = {
  display: 'inline-block',
  position: 'absolute',
  padding: '0.75rem 1.25rem',
  border: '1px solid transparent',
  borderRadius: '0.25rem',
  width: 'fit-content',
  fontSize: 16,
  color: '#fafafa',
  top: '1rem',
  right: '1rem',

  transition: 'opacity 0.5s'
}

export default class Alert extends Component<AlertProps, {}> {
  render() {
    const { text, bgColor = 'green', hide = true } = this.props;

    return (
      <div style={{ backgroundColor: bgColor, opacity: hide ? '0' : '1', ...css }}>
        {text}
      </div>
    )
  }
}