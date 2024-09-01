import { Typography } from '@mui/material'
import Icon from '@mui/material/Icon'
import { Box, Stack } from '@mui/system'

interface Props {
  id: Number
  icon: string
  title: string
  selected: boolean
  onSwitch: React.Dispatch<React.SetStateAction<string>>
}

function AsideNavItem(props: Props) {
  const elementId = `nav-${props.id}`
  return (
    <>
      <input
        className='nav-tab hidden'
        type='checkbox'
        id={elementId}
        checked={props.selected}
        onChange={() => props.onSwitch(props.title)}
      />
      <label htmlFor={elementId}>
        <Box
          className={`aside-nav-item ${props.selected ? 'selected' : ''} flex max-h-[6vh] min-h-[6vh] max-w-full items-center rounded-bl-[50px] rounded-tl-[50px] text-left`}
        >
          <Stack
            direction={'row'}
            spacing={1}
            sx={{ paddingLeft: '15px' }}
            alignItems={'center'}
          >
            <Icon
              className={'material-symbols-outlined'}
              sx={{ fontSize: '10px' }}
            >
              {props.icon}
            </Icon>
            <Typography variant='subtitle1'>
              {props.title}
            </Typography>
          </Stack>
        </Box>
      </label>
    </>
  )
}

export default AsideNavItem
