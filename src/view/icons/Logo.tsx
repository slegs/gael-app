import React from 'react'
import {StyleSheet, TextProps} from 'react-native'
import Svg, {
  Defs,
  LinearGradient,
  Path,
  PathProps,
  Stop,
  SvgProps,
} from 'react-native-svg'
import {Image} from 'expo-image'

import {colors} from '#/lib/styles'
import {useKawaiiMode} from '#/state/preferences/kawaii'

const ratio = 1.1

type Props = {
  fill?: PathProps['fill']
  style?: TextProps['style']
} & Omit<SvgProps, 'style'>

export const Logo = React.forwardRef(function LogoImpl(props: Props, ref) {
  const {fill, ...rest} = props
  const gradient = fill === 'sky'
  const styles = StyleSheet.flatten(props.style)
  const _fill = gradient ? 'url(#sky)' : fill || styles?.color || colors.blue3
  // @ts-ignore it's fiiiiine
  const size = parseInt(rest.width || 32)

  const isKawaii = useKawaiiMode()

  if (isKawaii) {
    return (
      <Image
        source={
          size > 100
            ? require('../../../assets/kawaii.png')
            : require('../../../assets/kawaii_smol.png')
        }
        accessibilityLabel="Gael"
        accessibilityHint=""
        accessibilityIgnoresInvertColors
        style={[{height: size, aspectRatio: 1.4}]}
      />
    )
  }

  return (
    <Svg
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      viewBox="0 0 70 70"
      {...rest}
      style={[{width: size, height: size * ratio}, styles]}>
      {gradient && (
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#2ECC40" stopOpacity="1" />
            <Stop offset="1" stopColor="#27b838" stopOpacity="1" />
          </LinearGradient>
        </Defs>
      )}

      <Path
        fill={_fill || '#2ECC40'}
        d="M42.1 13.5L38.9 7.2A3.8 3.8 0 0 0 36.9 5.8L34.3 4.9L35.1 2.4A3.8 3.8 0 0 0 36.6 3.1H37.8A3.8 3.8 0 0 0 39.5 0L36.1-6.1A6.3 6.3 0 0 0 36.9-17.6A6.4 6.4 0 0 0 28.7-7.9L24.4-7.1A3.8 3.8 0 0 0 21.4 -2.7Q21.6 -1.8 22.4 -1.1L23.4 -0.1C24.0 0.5 24.8 0.7 25.5 0.8L24.4 3.4A6.4 6.4 0 0 0 24.9 9.1L22.9 13.6L16.7 15.0A3.8 3.8 0 0 0 18.2 22.5L25.5 21.1A3.8 3.8 0 0 0 27.9 19.4L31.7 13.8L35.1 16.6L38.0 25.8A3.8 3.8 0 0 0 42.1 13.5M29.0-4.5A3.8 3.8 0 1 1 36.1-1.6A3.8 3.8 0 0 1 29.0-4.5M38.4-0.4A1.3 1.3 0 0 1 37.5 0.6H36.1A1.3 1.3 0 0 1 36.1-2.0A1.3 1.3 0 0 0 37.2-2.7A1.3 1.3 0 0 0 36.5-3.4L36.9-4.4L37.0-4.7L39.4-1.1Q39.7-0.5 38.4-0.4M33.4-13.8A3.8 3.8 0 1 1 36.8-12.3A3.8 3.8 0 0 1 33.4-13.8M22.9-2.7A1.3 1.3 0 0 1 22.7-4.3A1.3 1.3 0 0 1 23.5-4.8L29.6-6.1Q30.6-6.3 31.5-6.0A3.8 3.8 0 0 1 33.5-1.2V-1.2A6.3 6.3 0 0 0 24.1-4.4Q23.8-4.8 23.4-5.1A1.3 1.3 0 1 0 21.8-3.4A1.3 1.3 0 1 1 20.2-1.8ZM23.0 18.8A1.3 1.3 0 0 1 22.4 19.4L15.0 20.9A1.3 1.3 0 0 1 14.5 17.7L23.8 16.2A1.3 1.3 0 0 0 24.7 15.5L27.8 10.3A1.3 1.3 0 0 0 27.6 8.9C26.9 7.7 26.6 5.9 27.3 4.3L28.2 2.2A6.4 6.4 0 0 0 34.6 5.1L33.7 7.2A3.8 3.8 0 0 1 31.2 9.4A1.3 1.3 0 0 0 30.5 10.1ZM39.1 28.2A1.3 1.3 0 0 1 37.4 27.3L33.1 18.8A1.3 1.3 0 0 0 32.7 18.1L28.6 16.5Q30.1 15.8 31.1 14.4L35.0 15.9Q35.6 16.1 35.8 16.7L40.0 25.0A1.3 1.3 0 0 1 39.1 28.1"
        transform="translate(35, 35) scale(1.0)"
      />
    </Svg>
  )
})
