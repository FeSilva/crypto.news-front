// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardWithCollapse from 'src/views/pages/ui/cards/basic/CardWithCollapse'
import NewsDetails from 'src/views/pages/news/details/details'
import { useRouter } from 'next/router'

const details = () => {
  const router = useRouter()
  const { query } = router

  // Access the data from the query object
  const { title, urlToImage, author, publishedAt, description, content } = query

  return (
    <NewsDetails
      title={title}
      description={description}
      content={content}
      urlToImage={urlToImage}
      author={author}
      publishedAt={publishedAt}
    />
  )
}

export default details
