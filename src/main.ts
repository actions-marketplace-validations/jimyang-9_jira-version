import * as core from '@actions/core'
import {getAllJiraVersions, getLatestUnreleasedVersion} from './client'
import {SUBDOMAIN, PROJECT, EMAIL, API_TOKEN} from './env'

async function run(): Promise<void> {
  try {
    const versions = await getAllJiraVersions(
      SUBDOMAIN,
      PROJECT,
      EMAIL,
      API_TOKEN
    )

    const latestVersion = getLatestUnreleasedVersion(versions)
    if (!latestVersion) {
      core.setFailed('Could not find latest unreleased version')
    }

    core.setOutput('latest-version', latestVersion)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
