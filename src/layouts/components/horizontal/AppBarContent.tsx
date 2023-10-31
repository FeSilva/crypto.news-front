// ** MUI Imports
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  hidden: boolean
  settings: Settings
  saveSettings: (values: Settings) => void
}
const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings } = props
  const auth = useAuth()

  // ** <UserDropdown settings={settings} />
  return <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>
}

export default AppBarContent
