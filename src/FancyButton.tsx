import React from 'react';

interface FancyButtonProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  color: string;
  width: number;
  height: number;
  fontSize: number;
  borderWidth: number;
  buttonText: string;
  id: string;
  style?: React.CSSProperties;
}

function FancyButton({ onClick, color, width, height, fontSize, borderWidth, buttonText, id, style }: FancyButtonProps) {
  const maskStyle = `#fancy-masked-element_${id} { mask: url(#${id}); -webkit-mask: url(#${id})}`;

  const buttonStyle: React.CSSProperties = {
    width,
    height,
    ...style,
  };

  const fancyFrontStyle: React.CSSProperties = {
    transform: `rotateX(0deg) translateZ(${height / 2}px)`,
  };

  const fancyBackStyle: React.CSSProperties = {
    transform: `rotateX(90deg) translateZ(${height / 2}px)`,
  };

  const textTransform = `matrix(1 0 0 1 ${width / 2} ${height / 1.6})`;
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <div className="fancy-button" style={buttonStyle} onClick={onClick}>
      <div className="fancy-flipper">
        <div className="fancy-front" style={fancyFrontStyle}>
          <svg height={height} width={width} viewBox={viewBox}>
            <defs>
              <mask id={id}>
                <rect width="100%" height="100%" fill="#FFFFFF" />
                <text
                  className="mask-text button-text"
                  fill="#000000"
                  transform={textTransform}
                  fontSize={fontSize}
                  width="100%"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  {buttonText}
                </text>
              </mask>
            </defs>
            <style>{maskStyle}</style>
            <rect
              id={`fancy-masked-element_${id}`}
              fill={color}
              width="100%"
              height="100%"
            />
          </svg>
        </div>
        <div className="fancy-back" style={fancyBackStyle}>
          <svg height={height} width={width} viewBox={viewBox}>
            <rect
              stroke={color}
              strokeWidth={borderWidth}
              fill="transparent"
              width="100%"
              height="100%"
            />
            <text
              className="button-text"
              transform={textTransform}
              fill={color}
              fontSize={fontSize}
              textAnchor="middle"
              letterSpacing="1"
            >
              {buttonText}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default FancyButton;
