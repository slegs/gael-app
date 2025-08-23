import Svg, {Path, PathProps, SvgProps} from 'react-native-svg'

const ratio = 17 / 64

export function Logotype({
  fill,
  ...rest
}: {fill?: PathProps['fill']} & SvgProps) {
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32)

  return (
    <Svg
      fill="none"
      viewBox="0 0 64 17"
      {...rest}
      width={size}
      height={Number(size) * ratio}>
      <Path
        fill={fill || '#2ECC40'}
        d="M8.5 3.5v8h-2V8H3v3.5H1V3.5h2v3h3.5v-3h2ZM14.5 8.5v.5H11c0 1 .5 1.5 1.5 1.5s1.5-.5 1.5-1h1.5c0 1.5-1 2.5-3 2.5-2 0-3-1-3-3.5s1-3.5 3-3.5 3 1 3 3.5ZM12.5 6c-1 0-1.5.5-1.5 1.5h3c0-1-.5-1.5-1.5-1.5ZM20 3.5v8h-1.5V9.5c-.5.5-1 1-2 1-1.5 0-2.5-1-2.5-2.5V3.5h2v4.5c0 .5.5 1 1 1s1-.5 1-1V3.5h2ZM24.5 3.5v8h-2V3.5h2Z"
      />
    </Svg>
  )
}
