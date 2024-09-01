import { DeleteRounded } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'

interface Props {
  files: File[]
}

function UploadedFilesGrid(props: Props) {
  const [rows, setRows] = useState(props.files)

  function handleDeleteFile(name: string) {
    // TODO: Add are you sure alert
    setRows(
      rows &&
        rows.filter(row => {
          row.name !== name
        })
    )
  }

  return (
    <Box
      className={
        'rounded-border max-h-[30vh] min-h-[30vh] border border-[#DBDBDB] px-[10px] py-[10px]'
      }
    >
      <Box
        className={
          'max-h-[28vh] min-h-[28vh] overflow-y-scroll px-[10px]'
        }
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#FFFFFF',
            borderRadius: '5px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#dbdbdb',
            borderRadius: '8px'
          }
        }}
      >
        <Stack direction={'column'}>
          {!!props.files && (
            <Typography variant='h6' fontWeight={400}>
              No uploaded files yet.
            </Typography>
          )}
          {props.files &&
            props.files.map((file, index) => (
              <Box
                key={index}
                sx={{
                  paddingX: '10px',
                  ':hover': {
                    backgroundColor: '#F2F2F2',
                    borderRadius: '5px'
                  }
                }}
              >
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  paddingY={2}
                >
                  <Typography variant='body1'>
                    {file.name}
                  </Typography>
                  <DeleteRounded
                    onClick={() =>
                      handleDeleteFile(file.name)
                    }
                    color='action'
                    sx={{
                      ':hover': {
                        cursor: 'pointer'
                      }
                    }}
                  ></DeleteRounded>
                </Stack>
              </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default UploadedFilesGrid
