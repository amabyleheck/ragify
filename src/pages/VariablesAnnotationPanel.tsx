import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import UploadedFilesGrid from '@/components/UploadedFilesGrid'
import { NavigationOption } from '@/utils/consts'
import {
  NewUploadedFileFormData,
  newUploadedFileSchema
} from '@/forms/FileUploadForm'

interface Props {
  onSwitch: React.Dispatch<React.SetStateAction<string>>
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

function VariablesAnnotationPanel(props: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm<NewUploadedFileFormData>({
    resolver: zodResolver(newUploadedFileSchema),
    defaultValues: { uploadedFiles: undefined }
  })

  return (
    <div className='panel'>
      <Stack direction={'column'} spacing={5}>
        <Stack spacing={1}>
          <Typography
            variant='h5'
            fontWeight={800}
            align='left'
            fontSize={20}
          >
            Upload documents
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant='h5'
            fontWeight={800}
            align='left'
            fontSize={20}
          >
            List of documents
          </Typography>
          <UploadedFilesGrid files={[]} />
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'flex-end'}
          spacing={2}
        >
          <Button
            type='button'
            variant='outlined'
            tabIndex={-1}
          >
            Discard
          </Button>
          <Button
            type='button'
            variant='contained'
            tabIndex={-1}
            onClick={() =>
              props.onSwitch(
                NavigationOption.VARIABLES.title
              )
            }
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </div>
  )
}

export default VariablesAnnotationPanel
